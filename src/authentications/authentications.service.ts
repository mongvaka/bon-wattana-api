import {Injectable, NotAcceptableException, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {Users} from "../users/users.entity";
import {IToken} from "./authentications.interface";
import {AuthenticationsDto} from "./authentications.dto";

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async jwtGenerated(user: Users) {
    const payload = {
      id: user.id,
      username: user.username,
    };
    console.log("payload", payload);
    const token: IToken = {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
      }),
      tokenType: "Bearer",
      expiresIn: "7d",
    };
    await this.usersService.tokenUpdated(user, token.accessToken);

    return {
        user: {...payload},
        token: token,
      }
  }


  // async signIn(dto: AuthenticationsDto) {
  //   const username = process.env.AD_USERNAME || '';
  //   const password = process.env.AD_PASSWORD || '';
  //   const config: any = {
  //     url: process.env.AD_URL || '',
  //     baseDN: process.env.AD_BASE_DN || '',
  //     username: `${username}`,
  //     password: `${password}`
  //   };
  //
  //   const ad = new ActiveDirectory(config);
  //   console.debug(config)
  //   console.log('access ad find()');
  //
  //   return new Promise((resolve, reject) => {
  //     ad.authenticate(username, password,  async (err, auth) => {
  //       if (err) {
  //         console.error('Error authenticate : ' + JSON.stringify(err));
  //         reject(err)
  //       }
  //       if (auth) {
  //         console.log('Authenticated successfully.');
  //         const query = `cn=${dto.username}`;
  //         return ad.findUsers(query, async (err, users) => {
  //           if (err) {
  //             console.error('Error authenticate : ' + JSON.stringify(err));
  //             reject(err)
  //           }
  //           if ((!users) || (users.length == 0)) {
  //             reject(true)
  //           } else {
  //             console.log(JSON.stringify(users));
  //             console.log(`Next process...`);
  //             const user = await this.usersService.findByUsernameAndActive(dto.username);
  //             if (user) {
  //               const result = this.jwtGenerated(user);
  //               await this.saveLogUser(user, "Login", user.username);
  //               resolve(result);
  //             } else {
  //               reject(true)
  //             }
  //           }
  //         });
  //       } else {
  //         console.log('Authentication failed!');
  //         reject(true)
  //       }
  //     });
  //   }).then((result)=>{
  //     console.log(result);
  //     return result;
  //   }).catch((error)=>{
  //     throw new UnauthorizedException();
  //   })
  // }

  async signIn(dto: AuthenticationsDto) {
    const user = await this.usersService.findByUsernameAndActive(dto.username);
    if (user) {
      const result = this.jwtGenerated(user);
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }

}
