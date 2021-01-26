package com.aim.flowershop.dao;

import com.aim.flowershop.dao.entity.OrdersDetailEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface OrdersDetailEntityMapper {

    //新建订单
    int insertOrdersDetail(OrdersDetailEntity ordersDetailEntity);
    //根据token查询所有订单
    List<Map<String,Object>> selectByOrderId(String orderId);

}