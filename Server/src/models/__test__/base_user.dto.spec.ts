import { UserBaseDto } from '../dto/base_user.dto';
import { FbUserDto } from '../dto/fb_user.dto';
import { CoreObj, PlainObj } from '../../../helpers/extensions';
import { UserBase, User } from '../values/';
import { FbUser } from '../values/fb_user';
import { userIUser } from '../../../helpers/entitiesDto.mock';

describe('Base_Event_Dto', () => {
  let userDto = UserBaseDto.fromInterface(userIUser);

  // let User = UserBase.fromDto(userDto);
  let fbUser = new FbUser('ac3343ca4ad3345', 'someFBtoken', 'me@fbm.com');
  let fbUserBase = FbUser.mixin(UserBase, fbUser);
  let fullUser = new fbUserBase(
    userIUser.gender,
    userIUser.age,
    userIUser.username,
    userIUser.email,
    userIUser.location,
    userIUser.interests,
    null,
    new Date(userIUser.registered),
  );

  it('Mixin usage:: should contain all properties upter applied mixing (have Fb_user.dto fields)', () => {
    let userFbDto = <FbUserDto & UserBaseDto>fullUser;

    // console.log(JSON.stringify(userFbDto));

    expect(userDto).toBeTruthy();
    expect(userDto.gender).toEqual('male');
    expect(userDto.registered).toBeInstanceOf(Date);
    expect(userDto.registered).toEqual(new Date(userIUser.registered));

    expect((<FbUserDto & UserBaseDto>userFbDto).username).toEqual(
      userIUser.username,
    );
    expect(userFbDto).toBeTruthy();
  });
});
