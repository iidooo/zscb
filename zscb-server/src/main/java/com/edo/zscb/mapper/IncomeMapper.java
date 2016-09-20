package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Income;

public interface IncomeMapper {
    int deleteByPrimaryKey(Integer incomeID);

    int insert(Income record);

    int insertSelective(Income record);

    Income selectByPrimaryKey(Integer incomeID);
    
    /**
     * 通过IdentityID获得收入信息
     * @param identityID 身份ID
     * @return 收入对象
     */
    Income selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(Income record);

    int updateByPrimaryKey(Income record);
}