package com.edo.zscb.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edo.wescr.model.WescrResult;
import com.edo.wescr.service.WescrService;
import com.iidooo.core.enums.ResponseStatus;
import com.iidooo.core.model.ResponseResult;

@Controller
public class WescrAction {
    private static final Logger logger = Logger.getLogger(WescrAction.class);

    @Autowired
    private WescrService wescrService;

    @ResponseBody
    @RequestMapping(value = { "/wescr/getPersonBadInfo" }, method = RequestMethod.POST)
    public ResponseResult getPersonBadInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            WescrResult data = wescrService.getPersonBadInfo(1, name, idNumber);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
            System.out.println(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/wescr/getPersonalHouseMate" }, method = RequestMethod.POST)
    public ResponseResult getPersonalHouseMate(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            WescrResult data = wescrService.getPersonalHouseMate(1, name, idNumber);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
            System.out.println(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/wescr/getBlackListByIdentityCard" }, method = RequestMethod.POST)
    public ResponseResult getBlackListByIdentityCard(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            String data = wescrService.getBlackListByIdentityCard(name, idNumber);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
            System.out.println(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = { "/wescr/queryPersonalSocialInfo" }, method = RequestMethod.POST)
    public ResponseResult queryPersonalSocialInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            String mobile = request.getParameter("mobile");
            String data = wescrService.queryPersonalSocialInfo(name, idNumber, mobile);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
            System.out.println(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = { "/wescr/zcyBankCardPersonalInfo" }, method = RequestMethod.POST)
    public ResponseResult zcyBankCardPersonalInfo(HttpServletRequest request, HttpServletResponse response) {
        ResponseResult result = new ResponseResult();
        try {
            String name = request.getParameter("name");
            String idNumber = request.getParameter("idNumber");
            String mobile = request.getParameter("mobile");
            String bankCardNo = request.getParameter("bankCardNo");
            String data = wescrService.zcyBankCardPersonalInfo(name, idNumber, mobile, bankCardNo);

            result.setStatus(ResponseStatus.OK.getCode());
            result.setData(data);
            System.out.println(data);
        } catch (Exception e) {
            logger.fatal(e);
            result.checkException(e);
        }
        return result;
    }
}
