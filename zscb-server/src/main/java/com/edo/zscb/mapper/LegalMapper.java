package com.edo.zscb.mapper;

import com.edo.zscb.model.po.Legal;

public interface LegalMapper {
    int deleteByPrimaryKey(Integer legalID);

    int insert(Legal record);

    int insertSelective(Legal record);

    Legal selectByPrimaryKey(Integer legalID);
    
    /**
     * 通过IdentityID获得司法信息
     * @param identityID 身份ID
     * @return 司法信息对象
     */
    Legal selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(Legal record);

    int updateByPrimaryKey(Legal record);
}