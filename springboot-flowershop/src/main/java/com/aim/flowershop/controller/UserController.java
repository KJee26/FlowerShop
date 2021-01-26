package com.aim.flowershop.controller;



import com.aim.flowershop.dao.entity.UserEntity;
import com.aim.flowershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users/wxlogin")
    public Map<String, Object> userLogin(@RequestParam(name = "phoneNumber") String phoneNumber,
                                         @RequestParam(name = "password") String password) {


        Map<String, Object> mmp = new HashMap<>();
        System.out.println(phoneNumber);
        System.out.println(password);
        UserEntity hasUser = userService.selectAllById(phoneNumber);
        //如果用户存在
        if (hasUser != null) {
            //如果密码正确
            if (password.equals(hasUser.getPassword())) {
                mmp.put("token", userService.selectToken(phoneNumber));
                System.out.println("用户密码正确，返回token");
            }
            //如果密码错误
            else {
                System.out.println("用户密码错误，返回空的token");
                mmp.put("token", null);
            }
        }
        //如果用户不存在，创建用户
        else {
            String token = phoneNumber + System.currentTimeMillis();
            UserEntity userEntity = new UserEntity(phoneNumber, password, token);
            int result = userService.insertInfo(userEntity);
            System.out.println(token);
            mmp.put("token", token);
            System.out.println("新用户创建成功，返回新用户的token");
        }

        return JsonData.toJson(mmp);
    }

    @RequestMapping(value = "/users/shoplogin")
    public Map<String, Object> shopLogin(@RequestParam(name = "phoneNumber") String phoneNumber,
                                         @RequestParam(name = "password") String password) {


        Map<String, Object> mmp = new HashMap<>();
        System.out.println(phoneNumber);
        System.out.println(password);
        UserEntity hasUser = userService.selectAllById(phoneNumber);
        //如果用户存在
        if (hasUser != null) {
            //如果密码正确
            if (password.equals(hasUser.getPassword())) {
                mmp.put("token", userService.selectToken(phoneNumber));
                System.out.println("用户密码正确，返回token");
            }
            //如果密码错误
            else {
                System.out.println("用户密码错误，返回空的token");
                mmp.put("token", null);
            }
        }
        return JsonData.toJson(mmp);
    }
}



