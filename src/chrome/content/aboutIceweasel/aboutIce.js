/* ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is debAbout.
 *
 * The Initial Developer of the Original Code is
 * Mike Hommey.
 * Portions created by the Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 *
 * Modified for inclusion as an extension.
 * Copyright (C) 2016  Desktopd Project
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

var ice = Services.appinfo.name.toLowerCase();

function AboutIce() {}

AboutIce.prototype = {
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),
  classDescription: "about:" + ice,
  classID: Components.ID("{5df05c89-5e9a-41f4-bd6a-700e4aa305fc}"),
  contractID: "@mozilla.org/network/protocol/about;1?what=" + ice,

  newChannel: function(uri)
  {
    var channel = Services.io.newChannel("chrome://iceweasel-branding/content/aboutIceweasel/ice.xhtml", null, null);
    var securityManager = Cc["@mozilla.org/scriptsecuritymanager;1"].getService(Ci.nsIScriptSecurityManager);
    var principal = securityManager.getCodebasePrincipal(uri);
    channel.originalURI = uri;
    channel.owner = principal;
    return channel;
  },

  getURIFlags: function(uri)
  {
    return Ci.nsIAboutModule.URI_SAFE_FOR_UNTRUSTED_CONTENT;
  }
}

var NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutIce]);
