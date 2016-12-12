package com.edo.zscb.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.vo.SearchCondition;
import com.sun.org.glassfish.gmbal.ParameterNames;

public interface IdentityMapper {
    int deleteByPrimaryKey(Integer identityID);

    /**
     * 插入Identity对象
     * @param record Identity对象
     * @return 插入操作的返回行数
     */
    int insert(Identity record);

    /**
     * 通过IdentityID获得身份信息
     * @param identityID 身份ID
     * @return 身份对象
     */
    Identity selectByPrimaryKey(Integer identityID);
    
    /**
     * 通过身份证号查询获得Identity对象
     * @param idNumber 身份证号
     * @return Identity对象
     */
    Identity selectByIDNumber(@Param("idNumber")String idNumber, @Param("dataSource")String dataSource);
    
    /**
     * 查询符合条件的借款人身份信息数量
     * @param condition 查询条件
     * @return 借款人身份信息条数
     */
    int selectCountForSearch(SearchCondition condition);
    
    /**
     * 查询符合条件的借款人身份信息
     * @param condition 查询条件
     * @return 借款人身份信息列表
     */
    List<Identity> selectForSearch(SearchCondition condition);

    /**
     * 更新身份对象
     * @param record 身份对象
     * @return 更新所影响的行数
     */
    int updateByPrimaryKey(Identity record);
}