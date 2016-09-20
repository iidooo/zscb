package com.edo.zscb.mapper;

import java.util.List;

import com.edo.zscb.model.po.Bussiness;

public interface BussinessMapper {
    int deleteByPrimaryKey(Integer bussinessID);

    int insert(Bussiness record);

    int insertSelective(Bussiness record);

    Bussiness selectByPrimaryKey(Integer bussinessID);
    
    /**
     * 通过身份ID获得经营平台列表
     * @param identityID 身份ID
     * @return 经营平台列表
     */
    List<Bussiness> selectByIdentityID(Integer identityID);

    int updateByPrimaryKeySelective(Bussiness record);

    int updateByPrimaryKey(Bussiness record);
}