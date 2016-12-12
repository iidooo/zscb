package com.edo.zscb.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.dolphin.service.DolphinService;
import com.edo.wescr.model.WescrResult;
import com.edo.wescr.service.WescrService;
import com.edo.zscb.model.po.AssetHouse;
import com.edo.zscb.model.po.AssetVehicle;
import com.edo.zscb.model.po.Bussiness;
import com.edo.zscb.model.po.Debt;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.po.Income;
import com.edo.zscb.model.po.Legal;
import com.edo.zscb.model.po.LegalBlack;
import com.edo.zscb.model.po.Pawn;
import com.edo.zscb.model.po.Register;
import com.edo.zscb.model.po.Staff;
import com.edo.zscb.model.po.StaffExp;
import com.edo.zscb.model.vo.HouseOwner;
import com.edo.zscb.model.vo.SearchCondition;
import com.edo.zscb.service.CreditService;
import com.iidooo.core.constant.RegularConstant;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.Page;
import com.iidooo.core.model.ResponseResult;
import com.iidooo.core.util.PageUtil;
import com.iidooo.core.util.StringUtil;
import com.iidooo.core.util.ValidateUtil;

@Controller
public class CreditAction {

    private static final Logger logger = Logger.getLogger(CreditAction.class);

    @Autowired
    private CreditService creditService;

    @Autowired
    private WescrService wescrService;

    @Autowired
    private DolphinService dolphinService;

    @ResponseBody
    @RequestMapping(value = { "/bussiness/creditSearch" }, method = RequestMethod.POST)
    public ResponseResult creditSearch(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String selfName = request.getParameter("selfName");
            String selfIDNumber = request.getParameter("selfIDNumber");
            String selfMobile = request.getParameter("selfMobile");
            String selfCardNumber = request.getParameter("selfCardNumber");

            String mateName = request.getParameter("mateName");
            String mateIDNumber = request.getParameter("mateIDNumber");
            String mateMobile = request.getParameter("mateMobile");
            String mateCardNumber = request.getParameter("mateCardNumber");

            String houseNumber = request.getParameter("houseNumber");
            String houseAddress = request.getParameter("houseAddress");
            String houseArea = request.getParameter("houseArea");
            String houseOwnerList = request.getParameter("houseOwnerList");

            Integer operatorID = Integer.parseInt(request.getParameter("operatorID"));

            Identity mateIdentity = null;
            SearchCondition searchCondition = new SearchCondition();
            if (!mateName.isEmpty() && !mateIDNumber.isEmpty()) {
                searchCondition.setName(mateName);
                searchCondition.setIdNumber(mateIDNumber);
                searchCondition.setMobile(mateMobile);
                searchCondition.setCardNumber(mateCardNumber);
                mateIdentity = creditService.creditSearch(searchCondition, operatorID);
            }

            searchCondition.setName(selfName);
            searchCondition.setIdNumber(selfIDNumber);
            searchCondition.setMobile(selfMobile);
            searchCondition.setCardNumber(selfCardNumber);
            searchCondition.setIsMain(true);
            searchCondition.setHouseNumber(houseNumber);
            searchCondition.setHouseAddress(houseAddress);
            searchCondition.setHouseArea(houseArea);
            if (mateIdentity != null) {
                searchCondition.setMateID(mateIdentity.getIdentityID());
            }

            if (houseOwnerList != null) {
                // JSONArray jsonArray = JSONArray.fromObject(houseOwnerList);
                // for (Object object : jsonArray) {
                // JSONObject jsonObject = JSONObject.fromObject(object);
                // HouseOwner houseOwner = new HouseOwner();
                // houseOwner.setHouseOwnerName(jsonObject.getString("houseOwnerName"));
                // houseOwner.setHouseOwnerIDNumber(jsonObject.getString("houseOwnerIDNumber"));
                // searchCondition.getHouseOwnerList().add(houseOwner);
                // }
            }
            Identity selfIdentity = creditService.creditSearch(searchCondition, operatorID);

            if (!selfName.isEmpty() && !selfIDNumber.isEmpty()) {
                WescrResult wescrResultBadInfo = wescrService.getPersonBadInfo(operatorID, selfName, selfIDNumber);
                WescrResult wescrResultHouseMate = wescrService.getPersonalHouseMate(operatorID, selfName, selfIDNumber);
                WescrResult wescrResultBlackList = wescrService.getBlackListByIdentityCard(operatorID, selfName, selfIDNumber);
                WescrResult wescrResultSocialInfo = wescrService.queryPersonalSocialInfo(operatorID, selfName, selfIDNumber, selfMobile);

                dolphinService.queryZrrKxHonest(operatorID, selfName, selfIDNumber);
            }

            if (!mateName.isEmpty() && !mateIDNumber.isEmpty()) {
                wescrService.getPersonBadInfo(operatorID, mateName, mateIDNumber);
                wescrService.getPersonalHouseMate(operatorID, mateName, mateIDNumber);
                wescrService.getBlackListByIdentityCard(operatorID, mateName, mateIDNumber);
                wescrService.queryPersonalSocialInfo(operatorID, mateName, mateIDNumber, mateMobile);

                dolphinService.queryZrrKxHonest(operatorID, mateName, mateIDNumber);
            }

            // houseOwner.set

            // searchCondition.setHouseOwnerList(houseOwnerList);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getIdentityList" }, method = RequestMethod.POST)
    public ResponseResult getIdentityList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            SearchCondition condition = new SearchCondition();
            condition.setName(name);
            condition.setIdNumber(idNumber);
            condition.setDataSource(dataSource);

            int recordSum = creditService.getIdentityListCount(condition);

            Page page = new Page();
            String sortField = request.getParameter("sortField");
            if (StringUtil.isNotBlank(sortField)) {
                page.setSortField(sortField);
            }
            String sortType = request.getParameter("sortType");
            if (StringUtil.isNotBlank(sortType)) {
                page.setSortType(sortType);
            }
            String pageSize = request.getParameter("pageSize");
            if (StringUtil.isNotBlank(pageSize) && ValidateUtil.isMatch(pageSize, RegularConstant.REGEX_NUMBER)) {
                page.setPageSize(Integer.parseInt(pageSize));
            }
            String currentPage = request.getParameter("currentPage");
            if (StringUtil.isNotBlank(currentPage) && ValidateUtil.isMatch(currentPage, RegularConstant.REGEX_NUMBER)
                    && Integer.parseInt(currentPage) > 0) {
                page.setCurrentPage(Integer.parseInt(currentPage));
            }
            page = PageUtil.executePage(recordSum, page);
            condition.setPage(page);

            List<Identity> identityList = creditService.getIdentityList(condition);

            Map<String, Object> data = new HashMap<String, Object>();
            data.put("page", page);
            data.put("identityList", identityList);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getIdentityInfo" }, method = RequestMethod.POST)
    public ResponseResult getIdentityInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");
            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Identity identity = creditService.getIdentity(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(identity);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getRegisterInfo" }, method = RequestMethod.POST)
    public ResponseResult getRegisterInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Register register = creditService.getRegister(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(register);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getStaffInfo" }, method = RequestMethod.POST)
    public ResponseResult getStaffInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Staff staff = creditService.getStaff(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(staff);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getStaffExpList" }, method = RequestMethod.POST)
    public ResponseResult getStaffExpList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<StaffExp> staffExpList = creditService.getStaffExpList(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(staffExpList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getBussinessList" }, method = RequestMethod.POST)
    public ResponseResult getBussinessList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<Bussiness> bussinessList = creditService.getBussinessList(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(bussinessList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getHouseList" }, method = RequestMethod.POST)
    public ResponseResult getHouseList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<AssetHouse> houseList = creditService.getHouseList(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(houseList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getVehicleList" }, method = RequestMethod.POST)
    public ResponseResult getVehicleList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<AssetVehicle> vehicleList = creditService.getVehicleList(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(vehicleList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getDebtInfo" }, method = RequestMethod.POST)
    public ResponseResult getDebtInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Debt debt = creditService.getDebt(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(debt);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getIncomeInfo" }, method = RequestMethod.POST)
    public ResponseResult getIncomeInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Income income = creditService.getIncome(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(income);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getLegalInfo" }, method = RequestMethod.POST)
    public ResponseResult getLegalInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Legal legal = creditService.getLegal(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(legal);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/bussiness/getLegalBlackList" }, method = RequestMethod.POST)
    public ResponseResult getLegalBlackList(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            List<LegalBlack> legalBlackList = creditService.getLegalBlackList(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(legalBlackList);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/bussiness/getPawnInfo" }, method = RequestMethod.POST)
    public ResponseResult getPawnInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String idNumber = request.getParameter("idNumber");
            String dataSource = request.getParameter("dataSource");

            result.checkFieldRequired("idNumber", idNumber);
            if (result.getMessages().size() > 0) {
                result.setStatus(ResponseStatus.Failed.getCode());
                return result;
            }

            Pawn pawn = creditService.getPawn(idNumber, dataSource);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(pawn);

        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}
