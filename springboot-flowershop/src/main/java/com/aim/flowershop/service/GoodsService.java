package com.aim.flowershop.service;

import com.aim.flowershop.dao.GoodsEntityMapper;
import com.aim.flowershop.dao.entity.CommentEntity;
import com.aim.flowershop.dao.entity.GoodsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by wln on 2018\8\6 0006.
 */
@Service
public class GoodsService {

    @Autowired
    private GoodsEntityMapper goodsEntityMapper;

    public Map<String,Object> selectGoodsById(int goodsId){
        //查询基本信息
        Map<String,Object> res = goodsEntityMapper.selectGoodsById(goodsId);
        System.out.println(res);
        //查询评论
        List<Map<String,Object>> comments = goodsEntityMapper.queryComments(goodsId);
        res.put("comments",comments);
        return res;
    }

    public List<Map<String,Object>> queryAllGoods(){
        List<Map<String,Object>> result = goodsEntityMapper.queryAllGoods();
        return result;
    }

    public int addGoods(GoodsEntity goodsEntity){
        int result = goodsEntityMapper.addGoods(goodsEntity);
        return result;
    }
    public int deleteGoodsById(int goodsId){
        goodsEntityMapper.deleteComments(goodsId);
        int result = goodsEntityMapper.deleteGoodsById(goodsId);
        return result;
    }
    public int updateGoods(Map<String,Object> map){
        int result = goodsEntityMapper.updateGoods(map);
        return result;
    }

    public int addComments(Map<String,Object> map){
        return 1;
    }

    public int addComment(Map<String,Object> map){
        // 遍历map中的值
        System.out.println(map);
        List<Map<String,Object>> list = (List<Map<String, Object>>) map.get("list");
        String token = (String) map.get("token");
        for(int i=0;i<list.size();i++){
            String goodsName= (String) list.get(i).get("goods_name");
            String comment= (String) list.get(i).get("comment");
            CommentEntity commentEntity = new CommentEntity(goodsName,comment,token);
            int result = goodsEntityMapper.addComment(commentEntity);
        }
        return 1;
    }

    public List<Map<String,Object>> queryRanking() {
        List<Map<String, Object>> res = goodsEntityMapper.queryRanking();
        return res;
    }

}
