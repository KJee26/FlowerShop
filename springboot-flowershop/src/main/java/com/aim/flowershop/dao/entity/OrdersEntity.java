package com.aim.flowershop.dao.entity;

public class OrdersEntity {
    private String orderId;
    private String token;
    private String totalPrice;
    private String createTime;
    private String address;
    private int custCode;
    private int shopCode;

    public OrdersEntity() {
    }

    public OrdersEntity(String orderId, String token, String totalPrice, String createTime, String address, int custCode, int shopCode) {
        this.orderId = orderId;
        this.token = token;
        this.totalPrice = totalPrice;
        this.createTime = createTime;
        this.address = address;
        this.custCode = custCode;
        this.shopCode = shopCode;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCustCode() {
        return custCode;
    }

    public void setCustCode(int custCode) {
        this.custCode = custCode;
    }

    public int getShopCode() {
        return shopCode;
    }

    public void setShopCode(int shopCode) {
        this.shopCode = shopCode;
    }

    @Override
    public String toString() {
        return "OrdersEntity{" +
                "orderId='" + orderId + '\'' +
                ", token='" + token + '\'' +
                ", totalPrice='" + totalPrice + '\'' +
                ", createTime='" + createTime + '\'' +
                ", address='" + address + '\'' +
                ", custCode=" + custCode +
                ", shopCode=" + shopCode +
                '}';
    }
}