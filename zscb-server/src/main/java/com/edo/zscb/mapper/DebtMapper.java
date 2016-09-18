package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Debt;

public interface DebtMapper {
    int deleteByPrimaryKey(Integer houseID);

    int insert(Debt record);

    int insertSelective(Debt record);

    Debt selectByPrimaryKey(Integer houseID);

    int updateByPrimaryKeySelective(Debt record);

    int updateByPrimaryKey(Debt record);
}