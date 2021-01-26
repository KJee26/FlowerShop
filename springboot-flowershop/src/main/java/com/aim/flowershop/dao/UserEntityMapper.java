package com.aim.flowershop.dao;

import com.aim.flowershop.dao.entity.UserEntity;
import org.springframework.stereotype.Repository;


@Repository
public interface UserEntityMapper {
    /**
     * 根据用户名查找用户信息
     * @param username
     * @return
     */
    UserEntity selectAllById(String username);
    int  insertInfo(UserEntity userEntity);
    String selectToken(String userId);
}