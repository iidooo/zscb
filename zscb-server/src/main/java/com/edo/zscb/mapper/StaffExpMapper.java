package com.edo.zscb.mapper;

import com.edo.zscb.model.po.StaffExp;

public interface StaffExpMapper {
    int deleteByPrimaryKey(Integer expID);

    int insert(StaffExp record);

    int insertSelective(StaffExp record);

    StaffExp selectByPrimaryKey(Integer expID);

    int updateByPrimaryKeySelective(StaffExp record);

    int updateByPrimaryKey(StaffExp record);
}