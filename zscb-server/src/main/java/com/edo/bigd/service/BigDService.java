package com.edo.bigd.service;

public interface BigDService {
    
    /**
     * 登录账户
     * @return
     */
    boolean login();
    
    boolean checkIdentityMatch(Integer operatorID, String name, String idNumber);
}
