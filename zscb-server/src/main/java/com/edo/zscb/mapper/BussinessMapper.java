package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Bussiness;

public interface BussinessMapper {
    int deleteByPrimaryKey(Integer bussinessID);

    int insert(Bussiness record);

    int insertSelective(Bussiness record);

    Bussiness selectByPrimaryKey(Integer bussinessID);

    int updateByPrimaryKeySelective(Bussiness record);

    int updateByPrimaryKey(Bussiness record);
}