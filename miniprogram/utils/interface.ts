// 触发事件
interface event {
  changedTouches: Array<{clientX: number, clientY: number, force: number, identifier: number, pageX: number, pageY: number, [key: string]: number}>;
  currentTarget: {
    dataset: {
      id?: string | number,
      type?: string,
    },
    id: string | number | undefined,
    offsetLeft: number,
    offsetTop: number,
  };
  detail: any;
  mark: any;
  mut: boolean;
  target: object;
  timeStamp: number;
  touches: object;
  type: string;
  _userTap: boolean;
};

export {
  event,
}
