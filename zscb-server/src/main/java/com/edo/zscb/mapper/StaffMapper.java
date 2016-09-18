package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Staff;

public interface StaffMapper {
    int deleteByPrimaryKey(Integer staffID);

    int insert(Staff record);

    int insertSelective(Staff record);

    Staff selectByPrimaryKey(Integer staffID);

    int updateByPrimaryKeySelective(Staff record);

    int updateByPrimaryKey(Staff record);
}