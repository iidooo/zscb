package com.edo.zscb.service;

import com.edo.zscb.model.vo.BigDAccount;
import com.edo.zscb.model.vo.BigDOrder;
import com.edo.zscb.model.vo.BigDOrderList;
import com.edo.zscb.model.vo.SearchCondition;

public interface BigDService {
    
    /**
     * 得到BigD的Account信息
     * @return BigD的Account信息
     */
    BigDAccount getAccount();
    
    /**
     * 查询BigD的订单一览信息
     * @param page 当前页
     * @param perPage 每次数量
     * @param startTime 订单完成开始时间
     * @param endTime 订单完成结束时间
     * @return BigD的订单一览信息
     */
    BigDOrderList getOrderList(String page, String perPage, String startTime, String endTime);
    
    /**
     * 得到BigD的订单信息
     * @param id 订单ID
     * @return BigD的订单对象
     */
    BigDOrder getOrder(Integer id);
    
    /**
     * 创建一个BigD的订单并得到返回值
     * @param condition 查询条件封装
     * @return BigD的订单信息，其中包括了资信信息
     */
    BigDOrder createOrder(SearchCondition condition);
}
