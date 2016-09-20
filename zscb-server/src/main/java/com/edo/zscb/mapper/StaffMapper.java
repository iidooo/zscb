package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Staff;

public interface StaffMapper {
    int deleteByPrimaryKey(Integer staffID);

    int insert(Staff record);

    int insertSelective(Staff record);

    Staff selectByPrimaryKey(Integer staffID);
    
    /**
     * 通过身份ID获取职业信息
     * @param identityID 身份ID
     * @return 职业信息对象
     */
    Staff selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(Staff record);

    int updateByPrimaryKey(Staff record);
}