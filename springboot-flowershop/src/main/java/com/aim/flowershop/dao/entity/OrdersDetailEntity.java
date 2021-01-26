package com.aim.flowershop.dao.entity;

public class OrdersDetailEntity {
    private String orderId;
    private String goodsName;
    private String price;
    private int num;

    public OrdersDetailEntity() {
    }

    public OrdersDetailEntity(String orderId, String goodsName, String price, int num) {
        this.orderId = orderId;
        this.goodsName = goodsName;
        this.price = price;
        this.num = num;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public String toString() {
        return "OrdersDetailEntity{" +
                "orderId='" + orderId + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", price='" + price + '\'' +
                ", num=" + num +
                '}';
    }
}