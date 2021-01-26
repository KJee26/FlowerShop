package com.aim.flowershop.service;

import com.aim.flowershop.dao.OrdersEntityMapper;
import com.aim.flowershop.dao.entity.OrdersDetailEntity;
import com.aim.flowershop.dao.entity.OrdersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class OrdersService {
    @Autowired
    private OrdersEntityMapper ordersEntityMapper;

    @Resource(name="OrdersDetailService")
    private OrdersDetailService ordersDetailService;

    public int insertOrder(Map<String,Object> map){
        //读取订单对象
        String orderId = String.valueOf(System.currentTimeMillis());
        String token = map.get("token").toString();
        String totalPrice = map.get("totalPrice").toString();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String createTime = df.format(new Date());
        String address = ((Map<String,Object>)map.get("address")).get("all").toString();
        int custCode =0;
        int shopCode =0;
        //读取订单详情
        List<Map<String,Object>> goods = (List<Map<String,Object>>) map.get("cart");

        //创建订单实体对象
        OrdersEntity newOrdersEntity = new OrdersEntity(orderId,token,totalPrice,createTime,address,custCode,shopCode);

        int result = ordersEntityMapper.insertOrder(newOrdersEntity);

        //创建并存储订单详情
        for (int i = 0; i <goods.size() ; i++) {
            Map<String,Object> tmp = goods.get(i);
            String goods_name = tmp.get("goods_name").toString();
            String price = tmp.get("price").toString();
            int num = Integer.valueOf(tmp.get("num").toString());
            OrdersDetailEntity ordersDetailEntity = new OrdersDetailEntity(orderId,goods_name,price,num);
            ordersDetailService.insertOrder(ordersDetailEntity);
        }
        return result;
    }

    public List<Map<String,Object>> selectByToken(String token){
        List<Map<String,Object>> result = ordersEntityMapper.selectByToken(token);

        //增加商品列表信息
        for (int i = 0; i <result.size() ; i++) {
            String orderId = result.get(i).get("orderId").toString();
            List<Map<String,Object>> goodsByOrderId = ordersDetailService.selectByOrderId(orderId);
            result.get(i).put("goods",goodsByOrderId);
        }

        return result;
    }

    public List<Map<String,Object>> selectAllOrders(){
        List<Map<String,Object>> result = ordersEntityMapper.selectAllOrders();

        for (int i = 0; i <result.size() ; i++) {
            String orderId = result.get(i).get("orderId").toString();
            List<Map<String,Object>> goodsByOrderId = ordersDetailService.selectByOrderId(orderId);
            result.get(i).put("goods",goodsByOrderId);
        }

        return result;

    }

    public int updateCustStatus(Map<String,Object> map){
        int result = ordersEntityMapper.updateCustStatus(map);
        return result;
    }

    public int updateShopStatus(Map<String,Object> map){
        //商家确认发货后，商品库存减少，商品销量增加
//        if(map.get("toShopStatus").toString().equals("2")){
//            ordersEntityMapper.reduceReserveNum(map.get("orderId").toString());
//            ordersEntityMapper.addSalesNum(map.get("orderId").toString());
//        }
        int result = ordersEntityMapper.updateShopStatus(map);
        return result;
    }

    public double selectSumByToken(String token){
        List<Map<String,Object>> result = ordersEntityMapper.selectSumByToken(token);
        double sum = 0;

        for(int i = 0;i<result.size();i++){
            double price =Double.valueOf(result.get(i).get("price").toString());
            sum += price;
        }
        return sum;
    }

    public List<Map<String,Object>> selectByOrderId(String orderId){
        List<Map<String,Object>> list = ordersDetailService.selectByOrderId(orderId);
        return list;
    }

    public double selectShopSum(){
        List<Map<String,Object>> result = ordersEntityMapper.selectShopSum();
        double sum = 0;

        for(int i = 0;i<result.size();i++){
            double price =Double.valueOf(result.get(i).get("price").toString());
            sum += price;
        }
        return sum;
    }


}