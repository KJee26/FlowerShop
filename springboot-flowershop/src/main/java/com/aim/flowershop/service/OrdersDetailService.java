package com.aim.flowershop.service;


import com.aim.flowershop.dao.OrdersDetailEntityMapper;
import com.aim.flowershop.dao.entity.OrdersDetailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("OrdersDetailService")
public class OrdersDetailService {
    @Autowired
    private OrdersDetailEntityMapper ordersDetailEntityMapper;

    public int insertOrder(OrdersDetailEntity ordersDetailEntity) {
        int result = ordersDetailEntityMapper.insertOrdersDetail(ordersDetailEntity);
        return result;
    }

    public List<Map<String, Object>> selectByOrderId(String orderId) {
        List<Map<String, Object>> result = ordersDetailEntityMapper.selectByOrderId(orderId);
        return result;
    }

}