package com.aim.flowershop.dao.entity;

public class CommentEntity {
    private String goodsName;
    private String comment;
    private String token;

    public CommentEntity() {
    }

    public CommentEntity(String goodsName, String comment, String token) {
        this.goodsName = goodsName;
        this.comment = comment;
        this.token = token;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "CommentEntity{" +
                "goodsName='" + goodsName + '\'' +
                ", comment='" + comment + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
