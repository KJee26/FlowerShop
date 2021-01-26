package com.aim.flowershop.controller;

import java.util.HashMap;
import java.util.Map;

public class JsonData {
    public static Map<String,Object> toJson(Object message){
        Map<String,Object> json = new HashMap<>();
        Map<String,Object> meta = new HashMap<>();
        meta.put("msg","获取成功");
        meta.put("status",200);
        json.put("meta",meta);
        json.put("message",message);
        return json;
    }
}
