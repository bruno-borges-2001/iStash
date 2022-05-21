import Stash from "../models/Stash";

export default (stash: Stash): Stash => {
  return new Stash(
    stash.id,
    stash.name,
    stash.shared,
    stash.users,
    stash.invites,
    stash.usersInfo,
    stash.products,
    stash.date,
    stash.version
  );
};
