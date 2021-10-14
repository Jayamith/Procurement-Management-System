import axios from 'axios';

class Athentication {
  // ::::::::: User roles :::::::::
  // site manager
  // supplier
  // senior manager

  successfulLogin(user) {
    // this.setupAxiosInterceptors(authHead)
    sessionStorage.setItem('authenticatedUserName', user.userName);
    sessionStorage.setItem('authenticatedUserContact', user.contact);
    sessionStorage.setItem('authenticatedUserRole', user.role);
    sessionStorage.setItem('authenticatedUserObj',user)
  }

  setSite(site) {
    // this.setupAxiosInterceptors(authHead)
    sessionStorage.setItem('selectedSite', site);
  }

  getSite() {
    // this.setupAxiosInterceptors(authHead)
    return sessionStorage.getItem('selectedSite');
  }

  logout() {
    // this.ejectAxiosInterceptor()

    sessionStorage.removeItem('authenticatedUserName');
    sessionStorage.removeItem('authenticatedUserContact');
    sessionStorage.removeItem('authenticatedUserRole');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUserName');
    if (user === null) return false;
    return true;
  }

  loggedUserId() {
    let id = sessionStorage.getItem('authenticatedUserName');
    if (id === null) return '';
    return id;
  }

  loggedUserName() {
    let name = sessionStorage.getItem('authenticatedUserName');
    if (name === null) return '';
    return name;
  }

  loggedUserContact() {
    let contact = sessionStorage.getItem('authenticatedUserContact');
    if (contact === null) return '';
    return contact;
  }

  loggedUserRole() {
    let role = sessionStorage.getItem('authenticatedUserRole');
    if (role != null) return role;
    return null;
  }

  loggedUserContact() {
    let contact = sessionStorage.getItem('authenticatedUserContact');
    if (contact != null) return contact;
    return null;
  }

  loggedUserObject() {
    let userObj = sessionStorage.getItem('authenticatedUserObj');
    if (userObj != null) return userObj;
    return null;
  }
  loggedAsSupplier() {
    let role = this.loggedUserRole();
    if (role != null && role === 'supplier') return true;
    return false;
  }

  loggedAsSiteManager() {
    let role = this.loggedUserRole();
    console.log('role', role);
    if (role != null && role === 'siteManager') return true;
    return false;
  }

  loggedAsSenior() {
    let role = this.loggedUserRole();
    if (role != null && role === 'senior') return true;
    return false;
  }

  loggedAsProcurement() {
    let role = this.loggedUserRole();
    if (role != null && role === 'proc') return true;
    return false;
  }

  setupAxiosInterceptors(basicAuthHeader) {
    this.id = axios.interceptors.request.use((config) => {
      config.headers.authorization = basicAuthHeader;
      console.log('setting interceptor id: ' + this.id);
      return config;
    });
  }

  ejectAxiosInterceptor() {
    console.log('ejecting interceptor id: ' + this.id);
    axios.interceptors.request.eject(this.id);
    console.log('ejected interceptor id: ' + this.id);
  }
}

export default new Athentication();
