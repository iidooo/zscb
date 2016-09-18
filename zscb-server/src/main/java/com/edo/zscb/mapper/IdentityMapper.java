package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Identity;

public interface IdentityMapper {
    int deleteByPrimaryKey(Integer identityID);

    int insert(Identity record);

    int insertSelective(Identity record);

    Identity selectByPrimaryKey(Integer identityID);

    int updateByPrimaryKeySelective(Identity record);

    int updateByPrimaryKey(Identity record);
}