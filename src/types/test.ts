// 问题结构
export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 'positive' | 'negative'; // 正向或反向计分
}

// 答案结构
export interface Answer {
  questionId: number;
  value: number; // 1-5分
}

// 结果结构
export interface Result {
  type: string; // 如"INTJ"
  ei: number; // E/I维度得分百分比
  sn: number; // S/N维度得分百分比
  tf: number; // T/F维度得分百分比
  jp: number; // J/P维度得分百分比
}

// 人格类型描述
export interface PersonalityType {
  code: string; // 如"INTJ"
  name: string; // 类型名称
  nickname: string; // 类型昵称，如"建筑师"
  description: string; // 详细描述
  strengths: string[]; // 优势
  weaknesses: string[]; // 劣势
  careerPaths: string[]; // 适合的职业道路
}