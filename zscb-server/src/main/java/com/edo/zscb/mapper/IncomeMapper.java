package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Income;

public interface IncomeMapper {
    int deleteByPrimaryKey(Integer incomeID);

    int insert(Income record);

    int insertSelective(Income record);

    Income selectByPrimaryKey(Integer incomeID);

    int updateByPrimaryKeySelective(Income record);

    int updateByPrimaryKey(Income record);
}