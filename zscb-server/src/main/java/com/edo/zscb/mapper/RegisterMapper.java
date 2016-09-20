package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Register;

public interface RegisterMapper {
    int deleteByPrimaryKey(Integer registerID);

    int insert(Register record);

    int insertSelective(Register record);

    Register selectByPrimaryKey(Integer registerID);

    /**
     * 通过身份ID获取注册户籍信息
     * @param identityID 身份ID
     * @return 户籍信息
     */
    Register selectByIdentityID(Integer identityID);
    
    int updateByPrimaryKeySelective(Register record);

    int updateByPrimaryKey(Register record);
}