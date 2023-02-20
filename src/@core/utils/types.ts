interface MonthYear {
  year: number
  month: number
}

interface Fns {
  cardType(cardNumber: string): string
  formatCardNumber(cardNumber: string): string
  validateCardNumber(cardNumber: string): boolean
  validateCardCVC(cvc: string, type?: string): boolean
  validateCardExpiry(monthYear: string, year?: string): boolean
  cardExpiryVal(monthYear: string | HTMLInputElement): MonthYear
}

export type PaymentTypes = {
  fns: Fns
  formatCardCVC(elem: HTMLInputElement): HTMLInputElement
  restrictNumeric(elem: HTMLInputElement): HTMLInputElement
  formatCardNumber(elem: HTMLInputElement): HTMLInputElement
  formatCardExpiry(elem: HTMLInputElement): HTMLInputElement
}
export interface ITeacher {
  role:         string;
  isActive:     boolean;
  _id:          string;
  fullName:     string;
  email:        string;
  password:     string;
  birthDate:    string;
  phoneNumber:  string;
  address:      string;
  nationalId:   string;
  profile:      string;
  registerDate: Date;
  courses:      Course[];
  salt:         string;
  __v:          number;
}

export interface Course {
  lesson:    Lesson;
  _id:       string;
  title:     string;
  cost:      number;
  endDate:   EndDate;
  startDate: StartDate;
  capacity:  number;
}

export enum EndDate {
  SunDEC291399000000GMT0325IranStandardTime = "Sun Dec 29 1399 00:00:00 GMT+0325 (Iran Standard Time)",
  WedDEC291402000000GMT0325IranStandardTime = "Wed Dec 29 1402 00:00:00 GMT+0325 (Iran Standard Time)",
}

export interface Lesson {
  topics:      Topic[];
  _id:         ID;
  lessonName:  LessonName;
  description: Description;
  image:       Image;
}

export enum ID {
  The63Ec86C3D13C46556C20F84C = "63ec86c3d13c46556c20f84c",
  The63Ec8715D13C46556C20F84D = "63ec8715d13c46556c20f84d",
  The63Ec9Bb1D13C46556C20F855 = "63ec9bb1d13c46556c20f855",
}

export enum Description {
  VeryDifficultButEasy = "very difficult but easy",
}

export enum Image {
  ThisfolderJpg = "thisfolder.jpg",
}

export enum LessonName {
  AngularJSRookie = "AngularJs Rookie",
  Bootstrap = "bootstrap",
  Nextjs = "nextjs",
}

export enum Topic {
  Front = "front",
  Javascript = "javascript",
  Typescript = "typescript",
}

export enum StartDate {
  MonNov291402000000GMT0325IranStandardTime = "Mon Nov 29 1402 00:00:00 GMT+0325 (Iran Standard Time)",
  SatDEC291398000000GMT0325IranStandardTime = "Sat Dec 29 1398 00:00:00 GMT+0325 (Iran Standard Time)",
  ThuOct291401000000GMT0325IranStandardTime = "Thu Oct 29 1401 00:00:00 GMT+0325 (Iran Standard Time)",
  TueDEC291401000000GMT0325IranStandardTime = "Tue Dec 29 1401 00:00:00 GMT+0325 (Iran Standard Time)",
}
export interface ILesson {
  topics:      string[];
  _id:         string;
  lessonName:  string;
  description: string;
  image:       string;
  category:    number;
  createDate:  Date;
  courses:     Course[];
  __v:         number;
}
export interface IStudent {
  role:         string;
  isActive:     boolean;
  _id:          string;
  fullName:     string;
  email:        string;
  password:     string;
  birthDate:    string;
  phoneNumber:  string;
  nationalId:   string;
  profile:      string;
  registerDate: Date;
  courses:      any[];
  salt:         string;
  __v:          number;
}
