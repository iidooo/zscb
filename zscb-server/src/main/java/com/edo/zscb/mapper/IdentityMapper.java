package com.edo.zscb.mapper;

import java.util.List;

import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.vo.SearchCondition;

public interface IdentityMapper {
    int deleteByPrimaryKey(Integer identityID);

    int insert(Identity record);

    int insertSelective(Identity record);

    /**
     * 通过IdentityID获得身份信息
     * @param identityID 身份ID
     * @return 身份对象
     */
    Identity selectByPrimaryKey(Integer identityID);
    
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

    int updateByPrimaryKeySelective(Identity record);

    int updateByPrimaryKey(Identity record);
}