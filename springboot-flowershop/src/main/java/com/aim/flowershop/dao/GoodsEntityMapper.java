package com.aim.flowershop.dao;

import com.aim.flowershop.dao.entity.CommentEntity;
import com.aim.flowershop.dao.entity.GoodsEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GoodsEntityMapper {


    //根据id查询商品
    Map<String,Object> selectGoodsById(int goodsId);

    //查询所有商品
    List<Map<String,Object>> queryAllGoods();

    //添加一个商品
    int addGoods(GoodsEntity goodsEntity);

    //删除一个商品
    int deleteGoodsById(int goodsId);

    //更新商品状态
    int updateGoods(Map<String,Object> map);

    //添加商品评论
    int addComment(CommentEntity commentEntity);

    //查询销售排名
    List<Map<String, Object>> queryRanking();

    //查询商品的评论
    List<Map<String,Object>> queryComments(int orderId);

    //刪除商品评论
    int deleteComments(int goodsId);
}