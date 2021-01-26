package com.aim.flowershop.dao.entity;

import java.io.Serializable;

public class UserEntity implements Serializable {

    private String userId;
    private String password;
    private String token;

    public UserEntity() {
    }

    public UserEntity(String userId, String password, String token) {
        this.userId = userId;
        this.password = password;
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}