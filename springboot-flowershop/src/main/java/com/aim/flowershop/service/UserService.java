package com.aim.flowershop.service;

import com.aim.flowershop.dao.UserEntityMapper;
import com.aim.flowershop.dao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserEntityMapper userEntityMapper;


    public UserEntity selectAllById(String username) {
        UserEntity hasUser = userEntityMapper.selectAllById(username);
        return hasUser;
    }

    public int insertInfo(UserEntity userEntity){
        int result = userEntityMapper.insertInfo(userEntity);
        return result;
    }

    public String selectToken(String userId){
        return userEntityMapper.selectToken(userId);
    }
}
