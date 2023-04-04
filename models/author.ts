class Author {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  cv: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    bio: string,
    cv: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.cv = cv;
  }
}

export default Author;
