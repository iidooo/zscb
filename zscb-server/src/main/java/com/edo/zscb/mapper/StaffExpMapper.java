package com.edo.zscb.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.edo.zscb.model.po.StaffExp;

public interface StaffExpMapper {
    int deleteByPrimaryKey(Integer expID);

    /**
     * 插入工作经历
     * @param record 工作经历对象
     * @return 所影响的行数
     */
    int insert(StaffExp record);

    StaffExp selectByPrimaryKey(Integer expID);
    
    /**
     * 通过身份证号获得工作经历一览
     * @param idNumber 身份证号
     * @return 工作经历一览
     */
    List<StaffExp> selectByIDNumber(String idNumber);
    
    /**
     * 通过身份证号获得工作经历
     * @param idNumber 身份证号
     * @param enterDate 入职日期
     * @return 工作经历
     */
    StaffExp selectStaffExp(@Param("idNumber")String idNumber, @Param("enterDate")String enterDate);

    /**
     * 更新工作经历
     * @param record 工作经历对象
     * @return 所影响的行数
     */
    int updateByPrimaryKey(StaffExp record);
}