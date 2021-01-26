package com.aim.flowershop.controller;
import com.aim.flowershop.dao.entity.GoodsEntity;
import com.aim.flowershop.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
@RestController
public class GoodsController {
    @Autowired
    private GoodsService goodsService;

    //查询所有的商品列表
    @RequestMapping(value = "/goods/goods_list", method = RequestMethod.GET, headers = "Accept=application/json")
    public Map<String,Object> getGoodsList() {

        List<Map<String,Object>> result =goodsService.queryAllGoods();

        Map<String,Object> message = new HashMap<>();
        message.put("total",4);
        message.put("pagenum",1);
        message.put("goods",result);

        return JsonData.toJson(message);

    }

    //根据id获取商品信息
    @RequestMapping(value = "/goods/detail")
    public Map<String,Object> getGoodsDetail(@RequestParam(name = "goods_id") String goodsId){
        Map<String,Object> result = goodsService.selectGoodsById(Integer.valueOf(goodsId));
        System.out.println(result);
        return JsonData.toJson(result);
    }

    //添加商品
    @RequestMapping(value="/goods/goods_add", headers = "Accept=application/json")
    public int addGoods(@RequestBody GoodsEntity goodsEntity){
        int result = goodsService.addGoods(goodsEntity);
        System.out.println(goodsEntity.toString());
        return 1;
    }

    //根据id删除商品
    @RequestMapping(value = "/goods/goods_delete")
    public int deleteGoodsById(@RequestParam(name = "goods_id") String goodsId){

        int result = goodsService.deleteGoodsById(Integer.valueOf(goodsId));
        return 1;
    }

    //根据id修改商品价格和余量
    @RequestMapping(value = "/goods/goods_update")
    public int updateGoods(@RequestParam(name = "goods_id") String goodsId,
                           @RequestParam(name = "price") String price,
                           @RequestParam(name = "reserve_num") String reserveNum){
        Map<String,Object> map = new HashMap<>();
        map.put("goodsId",goodsId);
        map.put("price",price);
        map.put("reserveNum",reserveNum);
        int result = goodsService.updateGoods(map);
        return 1;
    }

    //根据顾客id添加评论
    @RequestMapping(value="/goods/comment")
    public int addComment(@RequestBody Map<String,Object> map){
        int result = goodsService.addComment(map);
        return result;
    }

    //按销售量查询鲜花排行
    @RequestMapping(value="/goods/ranking")
    public Map<String,Object> queryRanking(){
        List<Map<String,Object>> res = goodsService.queryRanking();
        return JsonData.toJson(res);
    }
}