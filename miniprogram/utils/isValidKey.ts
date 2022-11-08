export default (key: string, target: object): key is keyof typeof target => {
  return key in target;
}