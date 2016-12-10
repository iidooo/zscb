package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Staff;

public interface StaffMapper {
    int deleteByPrimaryKey(Integer staffID);
    
    /**
     * 插入职业信息
     * @param record 职业信息对象
     * @return 所影响的行数
     */
    int insert(Staff record);

    Staff selectByPrimaryKey(Integer staffID);
        
    /**
     * 通过身份证号获得职业信息
     * @param idNumber 身份证号
     * @return 职业信息对象
     */
    Staff selectByIDNumber(String idNumber);

    /**
     * 更新职业信息
     * @param record 职业信息对象
     * @return 更新操作影响的行数
     */
    int updateByPrimaryKey(Staff record);
}