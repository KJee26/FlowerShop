package com.aim.flowershop.dao.entity;

public class GoodsEntity {
   private int goodsId;
   private String goodsName;
   private int salesNum;
   private int reserveNum;
   private String unit;
   private String price;
   private String comment;
   private String pic;

    public int getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(int goodsId) {
        this.goodsId = goodsId;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public int getSalesNum() {
        return salesNum;
    }

    public void setSalesNum(int salesNum) {
        this.salesNum = salesNum;
    }

    public int getReserveNum() {
        return reserveNum;
    }

    public void setReserveNum(int reserveNum) {
        this.reserveNum = reserveNum;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public GoodsEntity() {
    }

    public GoodsEntity(int goodsId, String goodsName, int salesNum, int reserveNum, String unit, String price, String comment, String pic) {
        this.goodsId = goodsId;
        this.goodsName = goodsName;
        this.salesNum = salesNum;
        this.reserveNum = reserveNum;
        this.unit = unit;
        this.price = price;
        this.comment = comment;
        this.pic = pic;
    }

    @Override
    public String toString() {
        return "GoodsEntity{" +
                "goodsId=" + goodsId +
                ", goodsName='" + goodsName + '\'' +
                ", salesNum=" + salesNum +
                ", reserveNum=" + reserveNum +
                ", unit='" + unit + '\'' +
                ", price='" + price + '\'' +
                ", comment='" + comment + '\'' +
                ", pic='" + pic + '\'' +
                '}';
    }
}