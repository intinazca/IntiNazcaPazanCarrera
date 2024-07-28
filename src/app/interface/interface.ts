export interface Product {
  id: string
  name: string;
  description: string;
  date_revision: string;
  date_release: string;
  logo: string;
}

export interface toastInterface {
  message: string;
  duration: number;
  type: 'success' | 'error' | 'warning';
}

export interface DataAlert {
  /**
   * @description Tipo de alert a mostrar, recibe 5 valores 'done', 'warning', 'info', 'error' y 'question', (string) (obligatorio)
   */
  tipo?: string;
  /**
   * @description Titulo del alert, (string) (obligatorio)
   */
  titulo: string;
  /**
   * @description TContenido del alert, (string) (obligatorio)
   */
  mensaje?: string;
  /**
   * @description Texto que aparecerá en en el primer botón del dialog, (string) (obligatorio)
   */
  boton: string;
  /**
   * @description Texto que aparecerá en en el segundo botón del dialog, (opcional)
   */
  boton1?: string;
  /**
   * @description Valida si el alert lleva un input
   */
  input: boolean;
  /**
* @description Valida el tipo de input en el alert, 'number', 'password', 'email', 'text' : default 'number'
*/
  type?: string;
  /**
   * @description Valor inicial del input
   */
  valorInicialInput?: any;
  /**
   * @description Icono del input, mira los nombres en https://material.io/resources/icons/ : default 'credit_card'
   */
  inputIcon?: string;
  /**
   * @description Titulo del input : default 'Total a ingresar'
   */
  inputText?: string
  /**
   * @description Valida si el alert lleva radio
   */
  radio?: boolean;
  /**
   * @description Items del alert que lleva radiobuttons
   */
  itemsRadio?: any;
}