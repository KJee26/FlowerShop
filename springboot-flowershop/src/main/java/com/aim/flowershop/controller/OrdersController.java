package com.aim.flowershop.controller;

import com.aim.flowershop.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    //创建订单
    @RequestMapping(value = "/orders/create", headers = "Accept=application/json")
    public int createOrder(@RequestBody Map<String,Object> map) {
        int result = ordersService.insertOrder(map);

        return result;
    }

    //查询当前用户的所有订单
    @RequestMapping(value = "/orders/userbytoken")
    public Map<String,Object> selectOrders(@RequestParam(name = "token") String token) {
        List<Map<String,Object>> result = ordersService.selectByToken(token);

        return JsonData.toJson(result);
    }

    //查询当前用户的消费统计
    @RequestMapping(value = "/orders/sumbytoken")
    public Map<String,Object> selectSumByToken(@RequestParam(name = "token") String token){
        double result = ordersService.selectSumByToken(token);
        Map<String,Object> map = new HashMap<>();
        map.put("sum",result);

        return JsonData.toJson(map);

    }
    //查询商家的所有订单
    @RequestMapping(value = "/orders/all")
    public Map<String,Object> allOrders(){
        List<Map<String,Object>> result = ordersService.selectAllOrders();
        return JsonData.toJson(result);
    }

    //更新用户订单状态
    @RequestMapping(value ="/orders/update_cust")
    public int updateCustStatus(@RequestParam(name = "orderId")String orderId,
                                @RequestParam(name = "toCustStatus")String toCustStatus){

        System.out.println(orderId);
        System.out.println(toCustStatus);
        Map<String,Object> map = new HashMap<>();
        map.put("orderId",orderId);
        map.put("toCustStatus",toCustStatus);
        int result = ordersService.updateCustStatus(map);
        return 1;
    }

    //更新商家订单状态
    @RequestMapping(value ="/orders/update_shop")
    public int updateShopStatus(@RequestParam(name = "orderId")String orderId,
                                @RequestParam(name = "toShopStatus")String toShopStatus){
        Map<String,Object> map = new HashMap<>();
        map.put("orderId",orderId);
        map.put("toShopStatus",toShopStatus);
        int result = ordersService.updateShopStatus(map);
        return 1;
    }

    //根据orderid查询商品列表
    @RequestMapping(value="/orders/goodsListByOrderId")
    public Map<String,Object> selectGoodsList(@RequestParam(name = "order_id")String order_id){
        List<Map<String,Object>> res = ordersService.selectByOrderId(order_id);
        return JsonData.toJson(res);
    }

    //查询店总营业额
    @RequestMapping(value="/orders/shop_sum")
    public Map<String,Object> selectShopSum(){
        double result = ordersService.selectShopSum();
        Map<String,Object> map = new HashMap<>();
        map.put("sum",result);

        return JsonData.toJson(map);
    }
}
