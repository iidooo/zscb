package com.edo.bigd.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.bigd.constant.BigDConstant;
import com.edo.bigd.service.BigDService;
import com.edo.zscb.model.po.Identity;
import com.edo.zscb.model.vo.SearchCondition;
import com.edo.zscb.service.CreditService;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.ResponseResult;

@Controller
public class BigDAction {
    private static final Logger logger = Logger.getLogger(BigDAction.class);
    
    @Autowired
    private BigDService bigDService;
    
    @Autowired
    private CreditService creditService;

    @ResponseBody
    @RequestMapping(value = { "/bigd/creditSearch" }, method = RequestMethod.POST)
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
                searchCondition.setDataSource(BigDConstant.DATA_SOURCE);
                mateIdentity = creditService.creditSearch(searchCondition, operatorID);
            }

            searchCondition.setName(selfName);
            searchCondition.setIdNumber(selfIDNumber);
            searchCondition.setMobile(selfMobile);
            searchCondition.setCardNumber(selfCardNumber);
            searchCondition.setHouseNumber(houseNumber);
            searchCondition.setHouseAddress(houseAddress);
            searchCondition.setHouseArea(houseArea);
            searchCondition.setIsMain(true);
            searchCondition.setDataSource(BigDConstant.DATA_SOURCE);
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

            bigDService.login();
            
            if (!selfName.isEmpty() && !selfIDNumber.isEmpty()) {                
                bigDService.checkIdentityMatch(operatorID, selfName, selfIDNumber);
            }

            if (!mateName.isEmpty() && !mateIDNumber.isEmpty()) {
                bigDService.checkIdentityMatch(operatorID, mateName, mateIDNumber);
            }
            
            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(selfIdentity);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}
