package com.edo.zscb.mapper;

import com.edo.zscb.model.po.IncomeCard;

public interface IncomeCardMapper {
    int deleteByPrimaryKey(Integer cardID);

    int insert(IncomeCard record);

    int insertSelective(IncomeCard record);

    IncomeCard selectByPrimaryKey(Integer cardID);

    int updateByPrimaryKeySelective(IncomeCard record);

    int updateByPrimaryKey(IncomeCard record);
}