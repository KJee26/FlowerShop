package com.aim.flowershop.dao;

import com.aim.flowershop.dao.entity.OrdersEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface OrdersEntityMapper {

    //新建订单
    int insertOrder(OrdersEntity ordersEntity);
    //根据token查询所有订单
    List<Map<String,Object>> selectByToken(String token);

    List<Map<String,Object>> selectAllOrders();

    int updateCustStatus(Map<String,Object> map);

    int updateShopStatus(Map<String,Object> map);

    List<Map<String,Object>> selectSumByToken(String token);

    List<Map<String,Object>> selectShopSum();

    int reduceReserveNum(String orderId);

    int addSalesNum(String orderId);
}