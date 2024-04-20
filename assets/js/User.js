class User {
  constructor() {
    this._users = null;
  }

  getUsers() {
    if (this._users === null) {
      try {
        const storedUsers = localStorage.getItem("users");
        this._users = storedUsers ? JSON.parse(storedUsers) : [];
      } catch (error) {
        return (this._users = []);
      }
    }
    return this._users;
  }

  saveUser(userData) {
    // Validation process
    const { name, username, avatar, password } = userData;

    if (typeof name !== "string" || name.trim() === "") {
      return {
        success: false,
        error: "Name is missing",
      };
    }

    if (typeof username !== "string" || username.trim() === "") {
      return {
        success: false,
        error: "Username is missing",
      };
    }

    if (typeof avatar !== "string" || avatar.trim() === "") {
      return {
        success: false,
        error: "Avatar is missing",
      };
    }

    if (typeof password !== "string" || password.trim() === "") {
      return {
        success: false,
        error: "Password is missing",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        error: "Password at least has a 8 characters",
      };
    }

    const newUser = {
      id: Date.now(),
      isActive: true,
      ...userData,
    };

    const users = this.getUsers();
    users.push(newUser);

    try {
      localStorage.setItem("users", JSON.stringify(users));
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  userSignIn() {}
}
