package com.edo.dolphin.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edo.dolphin.constant.DolphinConstant;
import com.edo.dolphin.model.DolphinResult;
import com.edo.dolphin.model.DriverResource;
import com.edo.dolphin.model.HouseFundResource;
import com.edo.dolphin.model.IllegalResource;
import com.edo.dolphin.model.MarryResource;
import com.edo.dolphin.model.Resource;
import com.edo.dolphin.model.SocialResource;
import com.edo.dolphin.model.VehicleResource;
import com.edo.dolphin.service.DolphinService;
import com.edo.dolphin.util.DolphinAPIUtil;
import com.edo.zscb.mapper.AssetVehicleMapper;
import com.edo.zscb.mapper.IdentityMapper;
import com.edo.zscb.mapper.RegisterMapper;
import com.edo.zscb.mapper.StaffExpMapper;
import com.edo.zscb.mapper.StaffMapper;
import com.edo.zscb.model.po.AssetVehicle;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.po.Register;
import com.edo.zscb.model.po.Staff;
import com.edo.zscb.model.po.StaffExp;

@Service
public class DolphinServiceImpl implements DolphinService {

    private static final Logger logger = Logger.getLogger(DolphinServiceImpl.class);

    @Autowired
    private StaffMapper staffMapper;

    @Autowired
    private StaffExpMapper staffExpMapper;

    @Autowired
    private RegisterMapper registerMapper;

    @Autowired
    private AssetVehicleMapper assetVehicleMapper;

    @Override
    public DolphinResult queryZrrKxHonest(Integer operatorID, String name, String idNumber, String mobile) {
        DolphinResult result = new DolphinResult();

        try {
            String data = DolphinAPIUtil.execute(name, idNumber, mobile);

            Document document = DocumentHelper.parseText(data);
            Element root = document.getRootElement();
            result.setName(root.attributeValue("name"));
            result.setIdNumber(root.attributeValue("zjhm"));
            result.setSearchNo(root.attributeValue("cxbh"));

            Element resultElement = root.element("RESULT");
            result.setResult(resultElement.getText());

            if (!result.getResult().equals("1005")) {
                return result;
            }

            @SuppressWarnings("unchecked")
            List<Element> resourceList = root.elements("RESOURCE");
            for (Element element : resourceList) {
                String resources = element.attributeValue("RESOURCES");
                Resource resource = null;
                switch (resources) {
                case "GRZX130000005":
                    // 社会保险信息:GRZX130000005
                    resource = new SocialResource();

                    SocialResource socialResource = (SocialResource) resource;

                    // 社会保险登记号:SHBXDJM
                    socialResource.setRegisterCode(element.elementText("SHBXDJM"));
                    // 单位名称:DWMC
                    socialResource.setCompanyName(element.elementText("DWMC"));
                    // 缴纳社会保险金状态:JNSHBXJZTHZ
                    socialResource.setSocialPayStatus(element.elementText("JNSHBXJZTHZ"));
                    // 领取社会保险金状态:LQYLJZTHZ
                    socialResource.setSocialGetStatus(element.elementText("LQYLJZTHZ"));
                    // 工作时间:JDWRQ
                    socialResource.setSocialStartTime(element.elementText("JDWRQ"));
                    // 最新缴纳时间:ZXGXSJ
                    socialResource.setSocialUpdateTime(element.elementText("ZXGXSJ"));

                    processStaffData(socialResource, idNumber, operatorID);
                    processStaffExpData(socialResource, idNumber, operatorID);
                    break;
                case "XY0700050207030001":
                    // 公积金缴纳信息:XY0700050207030001
                    resource = new HouseFundResource();
                    HouseFundResource houseFundResource = (HouseFundResource) resource;

                    // 当前账户状态:A3
                    houseFundResource.setAccountStatus(element.elementText("A3"));
                    // 账户所在单位名称:A4
                    houseFundResource.setAccountCompanyName(element.elementText("A4"));
                    // 开户日期:A5
                    houseFundResource.setAccountCreateTime(element.elementText("A5"));

                    break;
                case "GRZX100000007":
                case "GRZX100000008":
                    // 结婚信息:GRZX100000007
                    // 离婚信息:GRZX100000008
                    resource = new MarryResource();
                    resource.setResourceCode(resources);
                    MarryResource marryResource = (MarryResource) resource;

                    // 登记机关:DJJG
                    marryResource.setRegisterOrg(element.elementText("DJJG"));
                    // 登记日期:DJRQ
                    marryResource.setRegisterDate(element.elementText("DJRQ"));
                    // 证书编号:ZSBH
                    marryResource.setRegisterNumber(element.elementText("ZSBH"));
                    // 配偶姓名:POXM
                    marryResource.setMateName(element.elementText("POXM"));

                    processRegisterData(marryResource, idNumber, operatorID);
                    break;
                case "GRZX080000032":
                    // 公安违法信息:GRZX080000032
                    resource = new IllegalResource();
                    IllegalResource illegalResource = (IllegalResource) resource;
                    // 是否有诈骗案件违法记录
                    illegalResource.setHasSwindling(element.elementText("SFYZPLAJWFJL"));
                    // 是否有盗窃案件违法记录
                    illegalResource.setHasTheft(element.elementText("SFYDQLAJWFJL"));
                    // 是否有招摇撞骗案件违法记录
                    illegalResource.setHasTrick(element.elementText("SFYZYZPLAJWFJL"));
                    // 是否有伪造变造买卖公文证件案件违法记录
                    illegalResource.setHasCounterfeit(element.elementText("SFYWZBZMMGWZJLAJWFJL"));
                    break;
                case "GRZX080000040":
                    // 车辆信息:GRZX080000040
                    resource = new VehicleResource();
                    VehicleResource vehicleResource = (VehicleResource) resource;

                    // 号牌种类:HPZL
                    vehicleResource.setLicenseType(element.elementText("HPZL"));
                    // 号牌号码:HPHM
                    vehicleResource.setLicenseNumber(element.elementText("HPHM"));
                    // 初次登记时间:CCDJRQ
                    vehicleResource.setRegisterTime(element.elementText("CCDJRQ"));
                    // 检验有效期止:YXQZ
                    vehicleResource.setInspectionValidityDate(element.elementText("YXQZ"));
                    // 最近定检日期:DJRQ
                    vehicleResource.setInspectionDate(element.elementText("DJRQ"));
                    // 强制报废期止:QZBFQZ
                    vehicleResource.setRetirementDate(element.elementText("QZBFQZ"));
                    // 保修终止日期:BXZZRQ
                    vehicleResource.setRepairDate(element.elementText("BXZZRQ"));
                    // 管理辖区:XZQH
                    vehicleResource.setRegisterArea(element.elementText("XZQH"));
                    // 机动车状态:ZTHZ
                    vehicleResource.setStatus(element.elementText("ZTHZ"));
                    // 是否抵押:DYBJHZ
                    vehicleResource.setIsMortgage(element.elementText("DYBJHZ"));

                    processVehicleData(vehicleResource, idNumber, operatorID);
                    break;
                case "GRZX080000039":
                case "GRZX080000038":
                    // 驾驶员酒驾信息:GRZX080000039
                    // 肇事逃逸信息:GRZX080000038
                    resource = new DriverResource();

                    DriverResource driverResource = (DriverResource) resource;
                    // 违法种类：WFMS
                    driverResource.setIllegalType(element.elementText("WFMS"));
                    // 处罚决定书编号:JDSBH
                    driverResource.setIllegalNumber(element.elementText("JDSBH"));
                    // 违法时间:WFSJ
                    driverResource.setIllegalTime(element.elementText("WFSJ"));
                    // 违法地址:WFDZ
                    driverResource.setIllegalAddress(element.elementText("WFDZ"));
                    // 处理时间:CLSJ
                    driverResource.setIllegalProcessTime(element.elementText("CLSJ"));
                    break;
                }

                if (resource != null) {

                    // RESOURCES:资源代码
                    resource.setResourceCode(resources);

                    // RESOURCENAME:资源名称
                    resource.setResourceName(element.attributeValue("RESOURCENAME"));
                    // XXSSDWDM:信息所属单位代码
                    resource.setUnitCode(element.attributeValue("XXSSDWDM"));
                    // XXSSDW:信息所属单位
                    resource.setUnitName(element.attributeValue("XXSSDW"));
                    // XXLB:信息类别
                    resource.setCategory(element.attributeValue("XXLB"));

                    result.getResources().add(resource);
                }
            }

        } catch (Exception e) {
            logger.fatal(e);
        }

        return result;
    }

    private boolean processStaffData(SocialResource socialResource, String idNumber, Integer operatorID) {
        try {
            // 构建职业信息对象
            Staff staff = new Staff();
            staff.setIdNumber(idNumber);
            staff.setSocialCompany(socialResource.getCompanyName());
            staff.setSocialStatus(socialResource.getSocialPayStatus());
            staff.setSocialLastDate(socialResource.getSocialUpdateTime().substring(0,9));
            staff.setDataSource(DolphinConstant.DATA_SOURCE);

            Staff existStaff = staffMapper.selectByIDNumber(idNumber, DolphinConstant.DATA_SOURCE);
            if (existStaff == null) {
                staff.setCreateTime(new Date());
                staff.setCreateUserID(operatorID);
                staffMapper.insert(staff);
            } else {
                staff.setStaffID(existStaff.getStaffID());
                staff.setUpdateUserID(operatorID);
                staffMapper.updateByPrimaryKey(staff);
            }
            return true;
        } catch (Exception e) {
            logger.fatal(e);
            return false;
        }
    }

    private boolean processStaffExpData(SocialResource socialResource, String idNumber, Integer operatorID) {
        try {
            // 构建职业经历信息对象
            StaffExp staffExp = new StaffExp();
            staffExp.setIdNumber(idNumber);
            staffExp.setCompany(socialResource.getCompanyName());
            if (socialResource.getSocialStartTime() != null) {
                staffExp.setEnterDate(socialResource.getSocialStartTime().substring(0,8));
            } else {
                staffExp.setEnterDate("");
            }
            
            staffExp.setDataSource(DolphinConstant.DATA_SOURCE);

            StaffExp existStaffExp = staffExpMapper.selectStaffExp(idNumber, staffExp.getEnterDate());
            if (existStaffExp == null) {
                staffExp.setCreateTime(new Date());
                staffExp.setCreateUserID(operatorID);
                staffExpMapper.insert(staffExp);
            } else {
                staffExp.setExpID(existStaffExp.getExpID());
                staffExp.setUpdateUserID(operatorID);
                staffExpMapper.updateByPrimaryKey(staffExp);
            }
            return true;
        } catch (Exception e) {
            logger.fatal(e);
            return false;
        }
    }

    private boolean processRegisterData(MarryResource marryResource, String idNumber, Integer operatorID) {
        try {

            // 构建户籍对象
            Register register = new Register();
            register.setIdNumber(idNumber);
            register.setDataSource(DolphinConstant.DATA_SOURCE);
            if (marryResource.getResourceCode().equals("GRZX100000007")) {
                register.setMarryStatus(DolphinConstant.HAS_MARRIED);
            } else if (marryResource.getResourceCode().equals("GRZX100000008")) {
                register.setMarryStatus(DolphinConstant.HAS_DIVORCE);
            } else {
                register.setMarryStatus(DolphinConstant.HAS_NOT_MARRIED);
            }

            Register existRegister = registerMapper.selectByIDNumber(idNumber, DolphinConstant.DATA_SOURCE);
            if (existRegister == null) {
                register.setCreateTime(new Date());
                register.setCreateUserID(operatorID);
                registerMapper.insert(register);
            } else {
                register.setRegisterID(existRegister.getRegisterID());
                register.setUpdateUserID(operatorID);
                registerMapper.updateByPrimaryKey(register);
            }
            return true;
        } catch (Exception e) {
            logger.fatal(e);
            return false;
        }
    }

    private boolean processVehicleData(VehicleResource vehicleResource, String idNumber, Integer operatorID) {
        try {
            // 构建车辆资产对象
            AssetVehicle assetVehicle = new AssetVehicle();
            assetVehicle.setIdNumber(idNumber);
            assetVehicle.setDataSource(DolphinConstant.DATA_SOURCE);
            assetVehicle.setLicense(vehicleResource.getLicenseNumber());
            if (vehicleResource.getLicenseNumber().startsWith(DolphinConstant.SHANGHAI)) {
                assetVehicle.setIsShanghai(true);
            } else {
                assetVehicle.setIsShanghai(false);
            }
            assetVehicle.setStatus(vehicleResource.getIsMortgage());

            AssetVehicle existAssetVehicle = assetVehicleMapper.selectAssetVehicle(idNumber, vehicleResource.getLicenseNumber());
            if (existAssetVehicle == null) {
                assetVehicle.setCreateTime(new Date());
                assetVehicle.setCreateUserID(operatorID);
                assetVehicleMapper.insert(assetVehicle);
            } else {
                assetVehicle.setVehicleID(existAssetVehicle.getVehicleID());
                assetVehicle.setUpdateUserID(operatorID);
                assetVehicleMapper.updateByPrimaryKey(assetVehicle);
            }
            return true;
        } catch (Exception e) {
            logger.fatal(e);
            return false;
        }
    }
}
