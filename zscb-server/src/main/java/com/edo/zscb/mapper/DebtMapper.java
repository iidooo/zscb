package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Debt;

public interface DebtMapper {
    int deleteByPrimaryKey(Integer houseID);

    int insert(Debt record);

    int insertSelective(Debt record);

    Debt selectByPrimaryKey(Integer houseID);
    
    /**
     * 通过IdentityID获得负债信息
     * @param identityID 身份ID
     * @return 负债对象
     */
    Debt selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(Debt record);

    int updateByPrimaryKey(Debt record);
}