package com.edo.dolphin.util;

import java.lang.reflect.Proxy;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.ws.security.handler.WSHandlerConstants;
import org.codehaus.xfire.XFireFactory;
import org.codehaus.xfire.client.Client;
import org.codehaus.xfire.client.XFireProxy;
import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.security.wss4j.WSS4JOutHandler;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;
import org.codehaus.xfire.util.dom.DOMOutHandler;

import com.edo.dolphin.constant.DolphinConstant;

public class DolphinAPIUtil {

    private static final Logger logger = Logger.getLogger(DolphinAPIUtil.class);

    public static void main(String args[]) {
        try {
            DolphinAPIUtil.execute("王轶贤", "31022919840724043X");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String execute(String name, String idNumber){
        String result = "";
        WSS4JOutHandler wsOut;
        Service srvcModel = new ObjectServiceFactory().create(AppQueryService.class);
        Client client;
        XFireProxyFactory factory = new XFireProxyFactory(XFireFactory.newInstance().getXFire());
        try {
            AppQueryService srvc = (AppQueryService) factory.create(srvcModel, DolphinConstant.DOLPHIN_API_URL);
            client = ((XFireProxy) Proxy.getInvocationHandler(srvc)).getClient();
            Properties properties = new Properties();
            properties.setProperty(WSHandlerConstants.USER, "ws_security");

            properties.setProperty(WSHandlerConstants.ACTION, WSHandlerConstants.ENCRYPT);
            properties.setProperty(WSHandlerConstants.ENC_PROP_FILE, "com/edo/dolphin/util/outsecurity_enc.properties");

            String xm = name;
            String zjhm = idNumber;
            String uname = DolphinConstant.DOLPHIN_LOGIN_ID;
            String password = DolphinConstant.DOLPHIN_LOGIN_PASSWORD;

            wsOut = new WSS4JOutHandler(properties);
            client.addOutHandler(new DOMOutHandler());
            client.addOutHandler(wsOut);
            String licenseFile = "15033333333";
            String[] param = new String[] { "123" };
            result = srvc.queryZrrKxHonest(xm, zjhm, uname, password, param, licenseFile);
            System.out.println(result);
            client.close();
        } catch (Exception e) {
            logger.fatal(e);
        }
        return result;
    }
}
