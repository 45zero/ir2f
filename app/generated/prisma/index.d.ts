
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Formation
 * 
 */
export type Formation = $Result.DefaultSelection<Prisma.$FormationPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Inscription
 * 
 */
export type Inscription = $Result.DefaultSelection<Prisma.$InscriptionPayload>
/**
 * Model DemandeInscription
 * 
 */
export type DemandeInscription = $Result.DefaultSelection<Prisma.$DemandeInscriptionPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Signature
 * 
 */
export type Signature = $Result.DefaultSelection<Prisma.$SignaturePayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model MessageDestinataire
 * 
 */
export type MessageDestinataire = $Result.DefaultSelection<Prisma.$MessageDestinatairePayload>
/**
 * Model Covoiturage
 * 
 */
export type Covoiturage = $Result.DefaultSelection<Prisma.$CovoituragePayload>
/**
 * Model CovoituragePassager
 * 
 */
export type CovoituragePassager = $Result.DefaultSelection<Prisma.$CovoituragePassagerPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STAGIAIRE: 'STAGIAIRE',
  FORMATEUR: 'FORMATEUR',
  ADMIN: 'ADMIN',
  DIRECTION: 'DIRECTION'
};

export type Role = (typeof Role)[keyof typeof Role]


export const StatutInscription: {
  EN_ATTENTE: 'EN_ATTENTE',
  VALIDEE: 'VALIDEE',
  REFUSEE: 'REFUSEE'
};

export type StatutInscription = (typeof StatutInscription)[keyof typeof StatutInscription]


export const TypeFormation: {
  PRESENTIEL: 'PRESENTIEL',
  VISIO: 'VISIO',
  ELEARNING: 'ELEARNING',
  MIXTE: 'MIXTE'
};

export type TypeFormation = (typeof TypeFormation)[keyof typeof TypeFormation]


export const StatutFormation: {
  BROUILLON: 'BROUILLON',
  PUBLIEE: 'PUBLIEE',
  ARCHIVEE: 'ARCHIVEE'
};

export type StatutFormation = (typeof StatutFormation)[keyof typeof StatutFormation]


export const StatutCovoiturage: {
  OUVERT: 'OUVERT',
  COMPLET: 'COMPLET',
  ANNULE: 'ANNULE'
};

export type StatutCovoiturage = (typeof StatutCovoiturage)[keyof typeof StatutCovoiturage]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type StatutInscription = $Enums.StatutInscription

export const StatutInscription: typeof $Enums.StatutInscription

export type TypeFormation = $Enums.TypeFormation

export const TypeFormation: typeof $Enums.TypeFormation

export type StatutFormation = $Enums.StatutFormation

export const StatutFormation: typeof $Enums.StatutFormation

export type StatutCovoiturage = $Enums.StatutCovoiturage

export const StatutCovoiturage: typeof $Enums.StatutCovoiturage

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formation`: Exposes CRUD operations for the **Formation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Formations
    * const formations = await prisma.formation.findMany()
    * ```
    */
  get formation(): Prisma.FormationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inscription`: Exposes CRUD operations for the **Inscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inscriptions
    * const inscriptions = await prisma.inscription.findMany()
    * ```
    */
  get inscription(): Prisma.InscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.demandeInscription`: Exposes CRUD operations for the **DemandeInscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DemandeInscriptions
    * const demandeInscriptions = await prisma.demandeInscription.findMany()
    * ```
    */
  get demandeInscription(): Prisma.DemandeInscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.signature`: Exposes CRUD operations for the **Signature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Signatures
    * const signatures = await prisma.signature.findMany()
    * ```
    */
  get signature(): Prisma.SignatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageDestinataire`: Exposes CRUD operations for the **MessageDestinataire** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageDestinataires
    * const messageDestinataires = await prisma.messageDestinataire.findMany()
    * ```
    */
  get messageDestinataire(): Prisma.MessageDestinataireDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.covoiturage`: Exposes CRUD operations for the **Covoiturage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Covoiturages
    * const covoiturages = await prisma.covoiturage.findMany()
    * ```
    */
  get covoiturage(): Prisma.CovoiturageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.covoituragePassager`: Exposes CRUD operations for the **CovoituragePassager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CovoituragePassagers
    * const covoituragePassagers = await prisma.covoituragePassager.findMany()
    * ```
    */
  get covoituragePassager(): Prisma.CovoituragePassagerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Formation: 'Formation',
    Session: 'Session',
    Inscription: 'Inscription',
    DemandeInscription: 'DemandeInscription',
    Document: 'Document',
    Signature: 'Signature',
    Message: 'Message',
    MessageDestinataire: 'MessageDestinataire',
    Covoiturage: 'Covoiturage',
    CovoituragePassager: 'CovoituragePassager',
    Article: 'Article'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "formation" | "session" | "inscription" | "demandeInscription" | "document" | "signature" | "message" | "messageDestinataire" | "covoiturage" | "covoituragePassager" | "article"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Formation: {
        payload: Prisma.$FormationPayload<ExtArgs>
        fields: Prisma.FormationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          findFirst: {
            args: Prisma.FormationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          findMany: {
            args: Prisma.FormationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>[]
          }
          create: {
            args: Prisma.FormationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          createMany: {
            args: Prisma.FormationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>[]
          }
          delete: {
            args: Prisma.FormationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          update: {
            args: Prisma.FormationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          deleteMany: {
            args: Prisma.FormationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>[]
          }
          upsert: {
            args: Prisma.FormationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormationPayload>
          }
          aggregate: {
            args: Prisma.FormationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormation>
          }
          groupBy: {
            args: Prisma.FormationGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormationGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormationCountArgs<ExtArgs>
            result: $Utils.Optional<FormationCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Inscription: {
        payload: Prisma.$InscriptionPayload<ExtArgs>
        fields: Prisma.InscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          findFirst: {
            args: Prisma.InscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          findMany: {
            args: Prisma.InscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>[]
          }
          create: {
            args: Prisma.InscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          createMany: {
            args: Prisma.InscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>[]
          }
          delete: {
            args: Prisma.InscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          update: {
            args: Prisma.InscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          deleteMany: {
            args: Prisma.InscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>[]
          }
          upsert: {
            args: Prisma.InscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscriptionPayload>
          }
          aggregate: {
            args: Prisma.InscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInscription>
          }
          groupBy: {
            args: Prisma.InscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<InscriptionCountAggregateOutputType> | number
          }
        }
      }
      DemandeInscription: {
        payload: Prisma.$DemandeInscriptionPayload<ExtArgs>
        fields: Prisma.DemandeInscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DemandeInscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DemandeInscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>
          }
          findFirst: {
            args: Prisma.DemandeInscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DemandeInscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>
          }
          findMany: {
            args: Prisma.DemandeInscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>[]
          }
          create: {
            args: Prisma.DemandeInscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>
          }
          createMany: {
            args: Prisma.DemandeInscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DemandeInscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>[]
          }
          delete: {
            args: Prisma.DemandeInscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>
          }
          update: {
            args: Prisma.DemandeInscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>
          }
          deleteMany: {
            args: Prisma.DemandeInscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DemandeInscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DemandeInscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>[]
          }
          upsert: {
            args: Prisma.DemandeInscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemandeInscriptionPayload>
          }
          aggregate: {
            args: Prisma.DemandeInscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDemandeInscription>
          }
          groupBy: {
            args: Prisma.DemandeInscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DemandeInscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DemandeInscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<DemandeInscriptionCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Signature: {
        payload: Prisma.$SignaturePayload<ExtArgs>
        fields: Prisma.SignatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          findFirst: {
            args: Prisma.SignatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          findMany: {
            args: Prisma.SignatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          create: {
            args: Prisma.SignatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          createMany: {
            args: Prisma.SignatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          delete: {
            args: Prisma.SignatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          update: {
            args: Prisma.SignatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          deleteMany: {
            args: Prisma.SignatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SignatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>[]
          }
          upsert: {
            args: Prisma.SignatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignaturePayload>
          }
          aggregate: {
            args: Prisma.SignatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignature>
          }
          groupBy: {
            args: Prisma.SignatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignatureCountArgs<ExtArgs>
            result: $Utils.Optional<SignatureCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      MessageDestinataire: {
        payload: Prisma.$MessageDestinatairePayload<ExtArgs>
        fields: Prisma.MessageDestinataireFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageDestinataireFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageDestinataireFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>
          }
          findFirst: {
            args: Prisma.MessageDestinataireFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageDestinataireFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>
          }
          findMany: {
            args: Prisma.MessageDestinataireFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>[]
          }
          create: {
            args: Prisma.MessageDestinataireCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>
          }
          createMany: {
            args: Prisma.MessageDestinataireCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageDestinataireCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>[]
          }
          delete: {
            args: Prisma.MessageDestinataireDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>
          }
          update: {
            args: Prisma.MessageDestinataireUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>
          }
          deleteMany: {
            args: Prisma.MessageDestinataireDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageDestinataireUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageDestinataireUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>[]
          }
          upsert: {
            args: Prisma.MessageDestinataireUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageDestinatairePayload>
          }
          aggregate: {
            args: Prisma.MessageDestinataireAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageDestinataire>
          }
          groupBy: {
            args: Prisma.MessageDestinataireGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageDestinataireGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageDestinataireCountArgs<ExtArgs>
            result: $Utils.Optional<MessageDestinataireCountAggregateOutputType> | number
          }
        }
      }
      Covoiturage: {
        payload: Prisma.$CovoituragePayload<ExtArgs>
        fields: Prisma.CovoiturageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CovoiturageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CovoiturageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>
          }
          findFirst: {
            args: Prisma.CovoiturageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CovoiturageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>
          }
          findMany: {
            args: Prisma.CovoiturageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>[]
          }
          create: {
            args: Prisma.CovoiturageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>
          }
          createMany: {
            args: Prisma.CovoiturageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CovoiturageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>[]
          }
          delete: {
            args: Prisma.CovoiturageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>
          }
          update: {
            args: Prisma.CovoiturageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>
          }
          deleteMany: {
            args: Prisma.CovoiturageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CovoiturageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CovoiturageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>[]
          }
          upsert: {
            args: Prisma.CovoiturageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePayload>
          }
          aggregate: {
            args: Prisma.CovoiturageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCovoiturage>
          }
          groupBy: {
            args: Prisma.CovoiturageGroupByArgs<ExtArgs>
            result: $Utils.Optional<CovoiturageGroupByOutputType>[]
          }
          count: {
            args: Prisma.CovoiturageCountArgs<ExtArgs>
            result: $Utils.Optional<CovoiturageCountAggregateOutputType> | number
          }
        }
      }
      CovoituragePassager: {
        payload: Prisma.$CovoituragePassagerPayload<ExtArgs>
        fields: Prisma.CovoituragePassagerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CovoituragePassagerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CovoituragePassagerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>
          }
          findFirst: {
            args: Prisma.CovoituragePassagerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CovoituragePassagerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>
          }
          findMany: {
            args: Prisma.CovoituragePassagerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>[]
          }
          create: {
            args: Prisma.CovoituragePassagerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>
          }
          createMany: {
            args: Prisma.CovoituragePassagerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CovoituragePassagerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>[]
          }
          delete: {
            args: Prisma.CovoituragePassagerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>
          }
          update: {
            args: Prisma.CovoituragePassagerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>
          }
          deleteMany: {
            args: Prisma.CovoituragePassagerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CovoituragePassagerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CovoituragePassagerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>[]
          }
          upsert: {
            args: Prisma.CovoituragePassagerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CovoituragePassagerPayload>
          }
          aggregate: {
            args: Prisma.CovoituragePassagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCovoituragePassager>
          }
          groupBy: {
            args: Prisma.CovoituragePassagerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CovoituragePassagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CovoituragePassagerCountArgs<ExtArgs>
            result: $Utils.Optional<CovoituragePassagerCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    formation?: FormationOmit
    session?: SessionOmit
    inscription?: InscriptionOmit
    demandeInscription?: DemandeInscriptionOmit
    document?: DocumentOmit
    signature?: SignatureOmit
    message?: MessageOmit
    messageDestinataire?: MessageDestinataireOmit
    covoiturage?: CovoiturageOmit
    covoituragePassager?: CovoituragePassagerOmit
    article?: ArticleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    inscriptions: number
    documentsUpload: number
    signatures: number
    messagesEnvoyes: number
    messagesRecus: number
    covoituragesConduit: number
    covoituragesPassager: number
    articles: number
    demandesInscription: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | UserCountOutputTypeCountInscriptionsArgs
    documentsUpload?: boolean | UserCountOutputTypeCountDocumentsUploadArgs
    signatures?: boolean | UserCountOutputTypeCountSignaturesArgs
    messagesEnvoyes?: boolean | UserCountOutputTypeCountMessagesEnvoyesArgs
    messagesRecus?: boolean | UserCountOutputTypeCountMessagesRecusArgs
    covoituragesConduit?: boolean | UserCountOutputTypeCountCovoituragesConduitArgs
    covoituragesPassager?: boolean | UserCountOutputTypeCountCovoituragesPassagerArgs
    articles?: boolean | UserCountOutputTypeCountArticlesArgs
    demandesInscription?: boolean | UserCountOutputTypeCountDemandesInscriptionArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsUploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSignaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignatureWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesEnvoyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMessagesRecusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageDestinataireWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCovoituragesConduitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CovoiturageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCovoituragesPassagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CovoituragePassagerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDemandesInscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeInscriptionWhereInput
  }


  /**
   * Count Type FormationCountOutputType
   */

  export type FormationCountOutputType = {
    sessions: number
    inscriptions: number
    demandes: number
    documents: number
  }

  export type FormationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | FormationCountOutputTypeCountSessionsArgs
    inscriptions?: boolean | FormationCountOutputTypeCountInscriptionsArgs
    demandes?: boolean | FormationCountOutputTypeCountDemandesArgs
    documents?: boolean | FormationCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormationCountOutputType
     */
    select?: FormationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountInscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountDemandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeInscriptionWhereInput
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    signatures: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signatures?: boolean | DocumentCountOutputTypeCountSignaturesArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountSignaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignatureWhereInput
  }


  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    destinataires: number
  }

  export type MessageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    destinataires?: boolean | MessageCountOutputTypeCountDestinatairesArgs
  }

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountDestinatairesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageDestinataireWhereInput
  }


  /**
   * Count Type CovoiturageCountOutputType
   */

  export type CovoiturageCountOutputType = {
    passagers: number
  }

  export type CovoiturageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passagers?: boolean | CovoiturageCountOutputTypeCountPassagersArgs
  }

  // Custom InputTypes
  /**
   * CovoiturageCountOutputType without action
   */
  export type CovoiturageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoiturageCountOutputType
     */
    select?: CovoiturageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CovoiturageCountOutputType without action
   */
  export type CovoiturageCountOutputTypeCountPassagersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CovoituragePassagerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    nom: string | null
    prenom: string | null
    telephone: string | null
    password: string | null
    role: $Enums.Role | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    nom: string | null
    prenom: string | null
    telephone: string | null
    password: string | null
    role: $Enums.Role | null
    actif: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    nom: number
    prenom: number
    telephone: number
    password: number
    role: number
    actif: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    telephone?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    telephone?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    nom?: true
    prenom?: true
    telephone?: true
    password?: true
    role?: true
    actif?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    nom: string
    prenom: string
    telephone: string | null
    password: string | null
    role: $Enums.Role
    actif: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscriptions?: boolean | User$inscriptionsArgs<ExtArgs>
    documentsUpload?: boolean | User$documentsUploadArgs<ExtArgs>
    signatures?: boolean | User$signaturesArgs<ExtArgs>
    messagesEnvoyes?: boolean | User$messagesEnvoyesArgs<ExtArgs>
    messagesRecus?: boolean | User$messagesRecusArgs<ExtArgs>
    covoituragesConduit?: boolean | User$covoituragesConduitArgs<ExtArgs>
    covoituragesPassager?: boolean | User$covoituragesPassagerArgs<ExtArgs>
    articles?: boolean | User$articlesArgs<ExtArgs>
    demandesInscription?: boolean | User$demandesInscriptionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    nom?: boolean
    prenom?: boolean
    telephone?: boolean
    password?: boolean
    role?: boolean
    actif?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "nom" | "prenom" | "telephone" | "password" | "role" | "actif" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscriptions?: boolean | User$inscriptionsArgs<ExtArgs>
    documentsUpload?: boolean | User$documentsUploadArgs<ExtArgs>
    signatures?: boolean | User$signaturesArgs<ExtArgs>
    messagesEnvoyes?: boolean | User$messagesEnvoyesArgs<ExtArgs>
    messagesRecus?: boolean | User$messagesRecusArgs<ExtArgs>
    covoituragesConduit?: boolean | User$covoituragesConduitArgs<ExtArgs>
    covoituragesPassager?: boolean | User$covoituragesPassagerArgs<ExtArgs>
    articles?: boolean | User$articlesArgs<ExtArgs>
    demandesInscription?: boolean | User$demandesInscriptionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      inscriptions: Prisma.$InscriptionPayload<ExtArgs>[]
      documentsUpload: Prisma.$DocumentPayload<ExtArgs>[]
      signatures: Prisma.$SignaturePayload<ExtArgs>[]
      messagesEnvoyes: Prisma.$MessagePayload<ExtArgs>[]
      messagesRecus: Prisma.$MessageDestinatairePayload<ExtArgs>[]
      covoituragesConduit: Prisma.$CovoituragePayload<ExtArgs>[]
      covoituragesPassager: Prisma.$CovoituragePassagerPayload<ExtArgs>[]
      articles: Prisma.$ArticlePayload<ExtArgs>[]
      demandesInscription: Prisma.$DemandeInscriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      nom: string
      prenom: string
      telephone: string | null
      password: string | null
      role: $Enums.Role
      actif: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscriptions<T extends User$inscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$inscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documentsUpload<T extends User$documentsUploadArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsUploadArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    signatures<T extends User$signaturesArgs<ExtArgs> = {}>(args?: Subset<T, User$signaturesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messagesEnvoyes<T extends User$messagesEnvoyesArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesEnvoyesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messagesRecus<T extends User$messagesRecusArgs<ExtArgs> = {}>(args?: Subset<T, User$messagesRecusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    covoituragesConduit<T extends User$covoituragesConduitArgs<ExtArgs> = {}>(args?: Subset<T, User$covoituragesConduitArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    covoituragesPassager<T extends User$covoituragesPassagerArgs<ExtArgs> = {}>(args?: Subset<T, User$covoituragesPassagerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    articles<T extends User$articlesArgs<ExtArgs> = {}>(args?: Subset<T, User$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    demandesInscription<T extends User$demandesInscriptionArgs<ExtArgs> = {}>(args?: Subset<T, User$demandesInscriptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly nom: FieldRef<"User", 'String'>
    readonly prenom: FieldRef<"User", 'String'>
    readonly telephone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly actif: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.inscriptions
   */
  export type User$inscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    cursor?: InscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * User.documentsUpload
   */
  export type User$documentsUploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.signatures
   */
  export type User$signaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    where?: SignatureWhereInput
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    cursor?: SignatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * User.messagesEnvoyes
   */
  export type User$messagesEnvoyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.messagesRecus
   */
  export type User$messagesRecusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    where?: MessageDestinataireWhereInput
    orderBy?: MessageDestinataireOrderByWithRelationInput | MessageDestinataireOrderByWithRelationInput[]
    cursor?: MessageDestinataireWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageDestinataireScalarFieldEnum | MessageDestinataireScalarFieldEnum[]
  }

  /**
   * User.covoituragesConduit
   */
  export type User$covoituragesConduitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    where?: CovoiturageWhereInput
    orderBy?: CovoiturageOrderByWithRelationInput | CovoiturageOrderByWithRelationInput[]
    cursor?: CovoiturageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CovoiturageScalarFieldEnum | CovoiturageScalarFieldEnum[]
  }

  /**
   * User.covoituragesPassager
   */
  export type User$covoituragesPassagerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    where?: CovoituragePassagerWhereInput
    orderBy?: CovoituragePassagerOrderByWithRelationInput | CovoituragePassagerOrderByWithRelationInput[]
    cursor?: CovoituragePassagerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CovoituragePassagerScalarFieldEnum | CovoituragePassagerScalarFieldEnum[]
  }

  /**
   * User.articles
   */
  export type User$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * User.demandesInscription
   */
  export type User$demandesInscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    where?: DemandeInscriptionWhereInput
    orderBy?: DemandeInscriptionOrderByWithRelationInput | DemandeInscriptionOrderByWithRelationInput[]
    cursor?: DemandeInscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DemandeInscriptionScalarFieldEnum | DemandeInscriptionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Formation
   */

  export type AggregateFormation = {
    _count: FormationCountAggregateOutputType | null
    _avg: FormationAvgAggregateOutputType | null
    _sum: FormationSumAggregateOutputType | null
    _min: FormationMinAggregateOutputType | null
    _max: FormationMaxAggregateOutputType | null
  }

  export type FormationAvgAggregateOutputType = {
    dureeHeures: number | null
    prix: number | null
    places: number | null
  }

  export type FormationSumAggregateOutputType = {
    dureeHeures: number | null
    prix: number | null
    places: number | null
  }

  export type FormationMinAggregateOutputType = {
    id: string | null
    titre: string | null
    description: string | null
    type: $Enums.TypeFormation | null
    statut: $Enums.StatutFormation | null
    dureeHeures: number | null
    prix: number | null
    places: number | null
    lienVisio: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormationMaxAggregateOutputType = {
    id: string | null
    titre: string | null
    description: string | null
    type: $Enums.TypeFormation | null
    statut: $Enums.StatutFormation | null
    dureeHeures: number | null
    prix: number | null
    places: number | null
    lienVisio: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormationCountAggregateOutputType = {
    id: number
    titre: number
    description: number
    type: number
    statut: number
    dureeHeures: number
    prix: number
    places: number
    lienVisio: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FormationAvgAggregateInputType = {
    dureeHeures?: true
    prix?: true
    places?: true
  }

  export type FormationSumAggregateInputType = {
    dureeHeures?: true
    prix?: true
    places?: true
  }

  export type FormationMinAggregateInputType = {
    id?: true
    titre?: true
    description?: true
    type?: true
    statut?: true
    dureeHeures?: true
    prix?: true
    places?: true
    lienVisio?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormationMaxAggregateInputType = {
    id?: true
    titre?: true
    description?: true
    type?: true
    statut?: true
    dureeHeures?: true
    prix?: true
    places?: true
    lienVisio?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormationCountAggregateInputType = {
    id?: true
    titre?: true
    description?: true
    type?: true
    statut?: true
    dureeHeures?: true
    prix?: true
    places?: true
    lienVisio?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FormationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formation to aggregate.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Formations
    **/
    _count?: true | FormationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormationMaxAggregateInputType
  }

  export type GetFormationAggregateType<T extends FormationAggregateArgs> = {
        [P in keyof T & keyof AggregateFormation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormation[P]>
      : GetScalarType<T[P], AggregateFormation[P]>
  }




  export type FormationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormationWhereInput
    orderBy?: FormationOrderByWithAggregationInput | FormationOrderByWithAggregationInput[]
    by: FormationScalarFieldEnum[] | FormationScalarFieldEnum
    having?: FormationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormationCountAggregateInputType | true
    _avg?: FormationAvgAggregateInputType
    _sum?: FormationSumAggregateInputType
    _min?: FormationMinAggregateInputType
    _max?: FormationMaxAggregateInputType
  }

  export type FormationGroupByOutputType = {
    id: string
    titre: string
    description: string | null
    type: $Enums.TypeFormation
    statut: $Enums.StatutFormation
    dureeHeures: number | null
    prix: number | null
    places: number | null
    lienVisio: string | null
    createdAt: Date
    updatedAt: Date
    _count: FormationCountAggregateOutputType | null
    _avg: FormationAvgAggregateOutputType | null
    _sum: FormationSumAggregateOutputType | null
    _min: FormationMinAggregateOutputType | null
    _max: FormationMaxAggregateOutputType | null
  }

  type GetFormationGroupByPayload<T extends FormationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormationGroupByOutputType[P]>
            : GetScalarType<T[P], FormationGroupByOutputType[P]>
        }
      >
    >


  export type FormationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    description?: boolean
    type?: boolean
    statut?: boolean
    dureeHeures?: boolean
    prix?: boolean
    places?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | Formation$sessionsArgs<ExtArgs>
    inscriptions?: boolean | Formation$inscriptionsArgs<ExtArgs>
    demandes?: boolean | Formation$demandesArgs<ExtArgs>
    documents?: boolean | Formation$documentsArgs<ExtArgs>
    _count?: boolean | FormationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formation"]>

  export type FormationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    description?: boolean
    type?: boolean
    statut?: boolean
    dureeHeures?: boolean
    prix?: boolean
    places?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formation"]>

  export type FormationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    description?: boolean
    type?: boolean
    statut?: boolean
    dureeHeures?: boolean
    prix?: boolean
    places?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formation"]>

  export type FormationSelectScalar = {
    id?: boolean
    titre?: boolean
    description?: boolean
    type?: boolean
    statut?: boolean
    dureeHeures?: boolean
    prix?: boolean
    places?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FormationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titre" | "description" | "type" | "statut" | "dureeHeures" | "prix" | "places" | "lienVisio" | "createdAt" | "updatedAt", ExtArgs["result"]["formation"]>
  export type FormationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Formation$sessionsArgs<ExtArgs>
    inscriptions?: boolean | Formation$inscriptionsArgs<ExtArgs>
    demandes?: boolean | Formation$demandesArgs<ExtArgs>
    documents?: boolean | Formation$documentsArgs<ExtArgs>
    _count?: boolean | FormationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FormationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FormationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FormationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Formation"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      inscriptions: Prisma.$InscriptionPayload<ExtArgs>[]
      demandes: Prisma.$DemandeInscriptionPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titre: string
      description: string | null
      type: $Enums.TypeFormation
      statut: $Enums.StatutFormation
      dureeHeures: number | null
      prix: number | null
      places: number | null
      lienVisio: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["formation"]>
    composites: {}
  }

  type FormationGetPayload<S extends boolean | null | undefined | FormationDefaultArgs> = $Result.GetResult<Prisma.$FormationPayload, S>

  type FormationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormationCountAggregateInputType | true
    }

  export interface FormationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Formation'], meta: { name: 'Formation' } }
    /**
     * Find zero or one Formation that matches the filter.
     * @param {FormationFindUniqueArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormationFindUniqueArgs>(args: SelectSubset<T, FormationFindUniqueArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Formation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormationFindUniqueOrThrowArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormationFindUniqueOrThrowArgs>(args: SelectSubset<T, FormationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationFindFirstArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormationFindFirstArgs>(args?: SelectSubset<T, FormationFindFirstArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationFindFirstOrThrowArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormationFindFirstOrThrowArgs>(args?: SelectSubset<T, FormationFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Formations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Formations
     * const formations = await prisma.formation.findMany()
     * 
     * // Get first 10 Formations
     * const formations = await prisma.formation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formationWithIdOnly = await prisma.formation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormationFindManyArgs>(args?: SelectSubset<T, FormationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Formation.
     * @param {FormationCreateArgs} args - Arguments to create a Formation.
     * @example
     * // Create one Formation
     * const Formation = await prisma.formation.create({
     *   data: {
     *     // ... data to create a Formation
     *   }
     * })
     * 
     */
    create<T extends FormationCreateArgs>(args: SelectSubset<T, FormationCreateArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Formations.
     * @param {FormationCreateManyArgs} args - Arguments to create many Formations.
     * @example
     * // Create many Formations
     * const formation = await prisma.formation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormationCreateManyArgs>(args?: SelectSubset<T, FormationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Formations and returns the data saved in the database.
     * @param {FormationCreateManyAndReturnArgs} args - Arguments to create many Formations.
     * @example
     * // Create many Formations
     * const formation = await prisma.formation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Formations and only return the `id`
     * const formationWithIdOnly = await prisma.formation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormationCreateManyAndReturnArgs>(args?: SelectSubset<T, FormationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Formation.
     * @param {FormationDeleteArgs} args - Arguments to delete one Formation.
     * @example
     * // Delete one Formation
     * const Formation = await prisma.formation.delete({
     *   where: {
     *     // ... filter to delete one Formation
     *   }
     * })
     * 
     */
    delete<T extends FormationDeleteArgs>(args: SelectSubset<T, FormationDeleteArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Formation.
     * @param {FormationUpdateArgs} args - Arguments to update one Formation.
     * @example
     * // Update one Formation
     * const formation = await prisma.formation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormationUpdateArgs>(args: SelectSubset<T, FormationUpdateArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Formations.
     * @param {FormationDeleteManyArgs} args - Arguments to filter Formations to delete.
     * @example
     * // Delete a few Formations
     * const { count } = await prisma.formation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormationDeleteManyArgs>(args?: SelectSubset<T, FormationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Formations
     * const formation = await prisma.formation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormationUpdateManyArgs>(args: SelectSubset<T, FormationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formations and returns the data updated in the database.
     * @param {FormationUpdateManyAndReturnArgs} args - Arguments to update many Formations.
     * @example
     * // Update many Formations
     * const formation = await prisma.formation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Formations and only return the `id`
     * const formationWithIdOnly = await prisma.formation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormationUpdateManyAndReturnArgs>(args: SelectSubset<T, FormationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Formation.
     * @param {FormationUpsertArgs} args - Arguments to update or create a Formation.
     * @example
     * // Update or create a Formation
     * const formation = await prisma.formation.upsert({
     *   create: {
     *     // ... data to create a Formation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Formation we want to update
     *   }
     * })
     */
    upsert<T extends FormationUpsertArgs>(args: SelectSubset<T, FormationUpsertArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationCountArgs} args - Arguments to filter Formations to count.
     * @example
     * // Count the number of Formations
     * const count = await prisma.formation.count({
     *   where: {
     *     // ... the filter for the Formations we want to count
     *   }
     * })
    **/
    count<T extends FormationCountArgs>(
      args?: Subset<T, FormationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormationAggregateArgs>(args: Subset<T, FormationAggregateArgs>): Prisma.PrismaPromise<GetFormationAggregateType<T>>

    /**
     * Group by Formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormationGroupByArgs['orderBy'] }
        : { orderBy?: FormationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Formation model
   */
  readonly fields: FormationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Formation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Formation$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Formation$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inscriptions<T extends Formation$inscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Formation$inscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    demandes<T extends Formation$demandesArgs<ExtArgs> = {}>(args?: Subset<T, Formation$demandesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Formation$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Formation$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Formation model
   */
  interface FormationFieldRefs {
    readonly id: FieldRef<"Formation", 'String'>
    readonly titre: FieldRef<"Formation", 'String'>
    readonly description: FieldRef<"Formation", 'String'>
    readonly type: FieldRef<"Formation", 'TypeFormation'>
    readonly statut: FieldRef<"Formation", 'StatutFormation'>
    readonly dureeHeures: FieldRef<"Formation", 'Int'>
    readonly prix: FieldRef<"Formation", 'Float'>
    readonly places: FieldRef<"Formation", 'Int'>
    readonly lienVisio: FieldRef<"Formation", 'String'>
    readonly createdAt: FieldRef<"Formation", 'DateTime'>
    readonly updatedAt: FieldRef<"Formation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Formation findUnique
   */
  export type FormationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation findUniqueOrThrow
   */
  export type FormationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation findFirst
   */
  export type FormationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formations.
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * Formation findFirstOrThrow
   */
  export type FormationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formation to fetch.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formations.
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * Formation findMany
   */
  export type FormationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter, which Formations to fetch.
     */
    where?: FormationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formations to fetch.
     */
    orderBy?: FormationOrderByWithRelationInput | FormationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Formations.
     */
    cursor?: FormationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * Formation create
   */
  export type FormationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * The data needed to create a Formation.
     */
    data: XOR<FormationCreateInput, FormationUncheckedCreateInput>
  }

  /**
   * Formation createMany
   */
  export type FormationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Formations.
     */
    data: FormationCreateManyInput | FormationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Formation createManyAndReturn
   */
  export type FormationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * The data used to create many Formations.
     */
    data: FormationCreateManyInput | FormationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Formation update
   */
  export type FormationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * The data needed to update a Formation.
     */
    data: XOR<FormationUpdateInput, FormationUncheckedUpdateInput>
    /**
     * Choose, which Formation to update.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation updateMany
   */
  export type FormationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Formations.
     */
    data: XOR<FormationUpdateManyMutationInput, FormationUncheckedUpdateManyInput>
    /**
     * Filter which Formations to update
     */
    where?: FormationWhereInput
    /**
     * Limit how many Formations to update.
     */
    limit?: number
  }

  /**
   * Formation updateManyAndReturn
   */
  export type FormationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * The data used to update Formations.
     */
    data: XOR<FormationUpdateManyMutationInput, FormationUncheckedUpdateManyInput>
    /**
     * Filter which Formations to update
     */
    where?: FormationWhereInput
    /**
     * Limit how many Formations to update.
     */
    limit?: number
  }

  /**
   * Formation upsert
   */
  export type FormationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * The filter to search for the Formation to update in case it exists.
     */
    where: FormationWhereUniqueInput
    /**
     * In case the Formation found by the `where` argument doesn't exist, create a new Formation with this data.
     */
    create: XOR<FormationCreateInput, FormationUncheckedCreateInput>
    /**
     * In case the Formation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormationUpdateInput, FormationUncheckedUpdateInput>
  }

  /**
   * Formation delete
   */
  export type FormationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    /**
     * Filter which Formation to delete.
     */
    where: FormationWhereUniqueInput
  }

  /**
   * Formation deleteMany
   */
  export type FormationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formations to delete
     */
    where?: FormationWhereInput
    /**
     * Limit how many Formations to delete.
     */
    limit?: number
  }

  /**
   * Formation.sessions
   */
  export type Formation$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Formation.inscriptions
   */
  export type Formation$inscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    cursor?: InscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Formation.demandes
   */
  export type Formation$demandesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    where?: DemandeInscriptionWhereInput
    orderBy?: DemandeInscriptionOrderByWithRelationInput | DemandeInscriptionOrderByWithRelationInput[]
    cursor?: DemandeInscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DemandeInscriptionScalarFieldEnum | DemandeInscriptionScalarFieldEnum[]
  }

  /**
   * Formation.documents
   */
  export type Formation$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Formation without action
   */
  export type FormationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    formationId: string | null
    dateDebut: Date | null
    dateFin: Date | null
    lieu: string | null
    lienVisio: string | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    formationId: string | null
    dateDebut: Date | null
    dateFin: Date | null
    lieu: string | null
    lienVisio: string | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    formationId: number
    dateDebut: number
    dateFin: number
    lieu: number
    lienVisio: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    formationId?: true
    dateDebut?: true
    dateFin?: true
    lieu?: true
    lienVisio?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    formationId?: true
    dateDebut?: true
    dateFin?: true
    lieu?: true
    lienVisio?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    formationId?: true
    dateDebut?: true
    dateFin?: true
    lieu?: true
    lienVisio?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    formationId: string
    dateDebut: Date
    dateFin: Date
    lieu: string | null
    lienVisio: string | null
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formationId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    lieu?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formationId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    lieu?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formationId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    lieu?: boolean
    lienVisio?: boolean
    createdAt?: boolean
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    formationId?: boolean
    dateDebut?: boolean
    dateFin?: boolean
    lieu?: boolean
    lienVisio?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "formationId" | "dateDebut" | "dateFin" | "lieu" | "lienVisio" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      formation: Prisma.$FormationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      formationId: string
      dateDebut: Date
      dateFin: Date
      lieu: string | null
      lienVisio: string | null
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    formation<T extends FormationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormationDefaultArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly formationId: FieldRef<"Session", 'String'>
    readonly dateDebut: FieldRef<"Session", 'DateTime'>
    readonly dateFin: FieldRef<"Session", 'DateTime'>
    readonly lieu: FieldRef<"Session", 'String'>
    readonly lienVisio: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Inscription
   */

  export type AggregateInscription = {
    _count: InscriptionCountAggregateOutputType | null
    _min: InscriptionMinAggregateOutputType | null
    _max: InscriptionMaxAggregateOutputType | null
  }

  export type InscriptionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    formationId: string | null
    statut: $Enums.StatutInscription | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InscriptionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    formationId: string | null
    statut: $Enums.StatutInscription | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InscriptionCountAggregateOutputType = {
    id: number
    userId: number
    formationId: number
    statut: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    formationId?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    formationId?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    formationId?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscription to aggregate.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inscriptions
    **/
    _count?: true | InscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InscriptionMaxAggregateInputType
  }

  export type GetInscriptionAggregateType<T extends InscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateInscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInscription[P]>
      : GetScalarType<T[P], AggregateInscription[P]>
  }




  export type InscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscriptionWhereInput
    orderBy?: InscriptionOrderByWithAggregationInput | InscriptionOrderByWithAggregationInput[]
    by: InscriptionScalarFieldEnum[] | InscriptionScalarFieldEnum
    having?: InscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InscriptionCountAggregateInputType | true
    _min?: InscriptionMinAggregateInputType
    _max?: InscriptionMaxAggregateInputType
  }

  export type InscriptionGroupByOutputType = {
    id: string
    userId: string
    formationId: string
    statut: $Enums.StatutInscription
    createdAt: Date
    updatedAt: Date
    _count: InscriptionCountAggregateOutputType | null
    _min: InscriptionMinAggregateOutputType | null
    _max: InscriptionMaxAggregateOutputType | null
  }

  type GetInscriptionGroupByPayload<T extends InscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], InscriptionGroupByOutputType[P]>
        }
      >
    >


  export type InscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formationId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscription"]>

  export type InscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formationId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscription"]>

  export type InscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    formationId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscription"]>

  export type InscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    formationId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "formationId" | "statut" | "createdAt" | "updatedAt", ExtArgs["result"]["inscription"]>
  export type InscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }
  export type InscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }
  export type InscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | FormationDefaultArgs<ExtArgs>
  }

  export type $InscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inscription"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      formation: Prisma.$FormationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      formationId: string
      statut: $Enums.StatutInscription
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inscription"]>
    composites: {}
  }

  type InscriptionGetPayload<S extends boolean | null | undefined | InscriptionDefaultArgs> = $Result.GetResult<Prisma.$InscriptionPayload, S>

  type InscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InscriptionCountAggregateInputType | true
    }

  export interface InscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inscription'], meta: { name: 'Inscription' } }
    /**
     * Find zero or one Inscription that matches the filter.
     * @param {InscriptionFindUniqueArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscriptionFindUniqueArgs>(args: SelectSubset<T, InscriptionFindUniqueArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InscriptionFindUniqueOrThrowArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, InscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionFindFirstArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscriptionFindFirstArgs>(args?: SelectSubset<T, InscriptionFindFirstArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionFindFirstOrThrowArgs} args - Arguments to find a Inscription
     * @example
     * // Get one Inscription
     * const inscription = await prisma.inscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, InscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inscriptions
     * const inscriptions = await prisma.inscription.findMany()
     * 
     * // Get first 10 Inscriptions
     * const inscriptions = await prisma.inscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inscriptionWithIdOnly = await prisma.inscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InscriptionFindManyArgs>(args?: SelectSubset<T, InscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inscription.
     * @param {InscriptionCreateArgs} args - Arguments to create a Inscription.
     * @example
     * // Create one Inscription
     * const Inscription = await prisma.inscription.create({
     *   data: {
     *     // ... data to create a Inscription
     *   }
     * })
     * 
     */
    create<T extends InscriptionCreateArgs>(args: SelectSubset<T, InscriptionCreateArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inscriptions.
     * @param {InscriptionCreateManyArgs} args - Arguments to create many Inscriptions.
     * @example
     * // Create many Inscriptions
     * const inscription = await prisma.inscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InscriptionCreateManyArgs>(args?: SelectSubset<T, InscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inscriptions and returns the data saved in the database.
     * @param {InscriptionCreateManyAndReturnArgs} args - Arguments to create many Inscriptions.
     * @example
     * // Create many Inscriptions
     * const inscription = await prisma.inscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inscriptions and only return the `id`
     * const inscriptionWithIdOnly = await prisma.inscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, InscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inscription.
     * @param {InscriptionDeleteArgs} args - Arguments to delete one Inscription.
     * @example
     * // Delete one Inscription
     * const Inscription = await prisma.inscription.delete({
     *   where: {
     *     // ... filter to delete one Inscription
     *   }
     * })
     * 
     */
    delete<T extends InscriptionDeleteArgs>(args: SelectSubset<T, InscriptionDeleteArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inscription.
     * @param {InscriptionUpdateArgs} args - Arguments to update one Inscription.
     * @example
     * // Update one Inscription
     * const inscription = await prisma.inscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InscriptionUpdateArgs>(args: SelectSubset<T, InscriptionUpdateArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inscriptions.
     * @param {InscriptionDeleteManyArgs} args - Arguments to filter Inscriptions to delete.
     * @example
     * // Delete a few Inscriptions
     * const { count } = await prisma.inscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InscriptionDeleteManyArgs>(args?: SelectSubset<T, InscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inscriptions
     * const inscription = await prisma.inscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InscriptionUpdateManyArgs>(args: SelectSubset<T, InscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscriptions and returns the data updated in the database.
     * @param {InscriptionUpdateManyAndReturnArgs} args - Arguments to update many Inscriptions.
     * @example
     * // Update many Inscriptions
     * const inscription = await prisma.inscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inscriptions and only return the `id`
     * const inscriptionWithIdOnly = await prisma.inscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, InscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inscription.
     * @param {InscriptionUpsertArgs} args - Arguments to update or create a Inscription.
     * @example
     * // Update or create a Inscription
     * const inscription = await prisma.inscription.upsert({
     *   create: {
     *     // ... data to create a Inscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inscription we want to update
     *   }
     * })
     */
    upsert<T extends InscriptionUpsertArgs>(args: SelectSubset<T, InscriptionUpsertArgs<ExtArgs>>): Prisma__InscriptionClient<$Result.GetResult<Prisma.$InscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionCountArgs} args - Arguments to filter Inscriptions to count.
     * @example
     * // Count the number of Inscriptions
     * const count = await prisma.inscription.count({
     *   where: {
     *     // ... the filter for the Inscriptions we want to count
     *   }
     * })
    **/
    count<T extends InscriptionCountArgs>(
      args?: Subset<T, InscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InscriptionAggregateArgs>(args: Subset<T, InscriptionAggregateArgs>): Prisma.PrismaPromise<GetInscriptionAggregateType<T>>

    /**
     * Group by Inscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscriptionGroupByArgs['orderBy'] }
        : { orderBy?: InscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inscription model
   */
  readonly fields: InscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    formation<T extends FormationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormationDefaultArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inscription model
   */
  interface InscriptionFieldRefs {
    readonly id: FieldRef<"Inscription", 'String'>
    readonly userId: FieldRef<"Inscription", 'String'>
    readonly formationId: FieldRef<"Inscription", 'String'>
    readonly statut: FieldRef<"Inscription", 'StatutInscription'>
    readonly createdAt: FieldRef<"Inscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Inscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inscription findUnique
   */
  export type InscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription findUniqueOrThrow
   */
  export type InscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription findFirst
   */
  export type InscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscriptions.
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscriptions.
     */
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Inscription findFirstOrThrow
   */
  export type InscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscription to fetch.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscriptions.
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscriptions.
     */
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Inscription findMany
   */
  export type InscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Inscriptions to fetch.
     */
    where?: InscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscriptions to fetch.
     */
    orderBy?: InscriptionOrderByWithRelationInput | InscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inscriptions.
     */
    cursor?: InscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscriptions.
     */
    distinct?: InscriptionScalarFieldEnum | InscriptionScalarFieldEnum[]
  }

  /**
   * Inscription create
   */
  export type InscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Inscription.
     */
    data: XOR<InscriptionCreateInput, InscriptionUncheckedCreateInput>
  }

  /**
   * Inscription createMany
   */
  export type InscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inscriptions.
     */
    data: InscriptionCreateManyInput | InscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inscription createManyAndReturn
   */
  export type InscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Inscriptions.
     */
    data: InscriptionCreateManyInput | InscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscription update
   */
  export type InscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Inscription.
     */
    data: XOR<InscriptionUpdateInput, InscriptionUncheckedUpdateInput>
    /**
     * Choose, which Inscription to update.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription updateMany
   */
  export type InscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inscriptions.
     */
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Inscriptions to update
     */
    where?: InscriptionWhereInput
    /**
     * Limit how many Inscriptions to update.
     */
    limit?: number
  }

  /**
   * Inscription updateManyAndReturn
   */
  export type InscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Inscriptions.
     */
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Inscriptions to update
     */
    where?: InscriptionWhereInput
    /**
     * Limit how many Inscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscription upsert
   */
  export type InscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Inscription to update in case it exists.
     */
    where: InscriptionWhereUniqueInput
    /**
     * In case the Inscription found by the `where` argument doesn't exist, create a new Inscription with this data.
     */
    create: XOR<InscriptionCreateInput, InscriptionUncheckedCreateInput>
    /**
     * In case the Inscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscriptionUpdateInput, InscriptionUncheckedUpdateInput>
  }

  /**
   * Inscription delete
   */
  export type InscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
    /**
     * Filter which Inscription to delete.
     */
    where: InscriptionWhereUniqueInput
  }

  /**
   * Inscription deleteMany
   */
  export type InscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscriptions to delete
     */
    where?: InscriptionWhereInput
    /**
     * Limit how many Inscriptions to delete.
     */
    limit?: number
  }

  /**
   * Inscription without action
   */
  export type InscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscription
     */
    select?: InscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscription
     */
    omit?: InscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscriptionInclude<ExtArgs> | null
  }


  /**
   * Model DemandeInscription
   */

  export type AggregateDemandeInscription = {
    _count: DemandeInscriptionCountAggregateOutputType | null
    _min: DemandeInscriptionMinAggregateOutputType | null
    _max: DemandeInscriptionMaxAggregateOutputType | null
  }

  export type DemandeInscriptionMinAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    message: string | null
    formationId: string | null
    userId: string | null
    statut: $Enums.StatutInscription | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DemandeInscriptionMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    prenom: string | null
    email: string | null
    telephone: string | null
    message: string | null
    formationId: string | null
    userId: string | null
    statut: $Enums.StatutInscription | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DemandeInscriptionCountAggregateOutputType = {
    id: number
    nom: number
    prenom: number
    email: number
    telephone: number
    message: number
    formationId: number
    userId: number
    statut: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DemandeInscriptionMinAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    message?: true
    formationId?: true
    userId?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DemandeInscriptionMaxAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    message?: true
    formationId?: true
    userId?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DemandeInscriptionCountAggregateInputType = {
    id?: true
    nom?: true
    prenom?: true
    email?: true
    telephone?: true
    message?: true
    formationId?: true
    userId?: true
    statut?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DemandeInscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DemandeInscription to aggregate.
     */
    where?: DemandeInscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemandeInscriptions to fetch.
     */
    orderBy?: DemandeInscriptionOrderByWithRelationInput | DemandeInscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DemandeInscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemandeInscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemandeInscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DemandeInscriptions
    **/
    _count?: true | DemandeInscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DemandeInscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DemandeInscriptionMaxAggregateInputType
  }

  export type GetDemandeInscriptionAggregateType<T extends DemandeInscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateDemandeInscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDemandeInscription[P]>
      : GetScalarType<T[P], AggregateDemandeInscription[P]>
  }




  export type DemandeInscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemandeInscriptionWhereInput
    orderBy?: DemandeInscriptionOrderByWithAggregationInput | DemandeInscriptionOrderByWithAggregationInput[]
    by: DemandeInscriptionScalarFieldEnum[] | DemandeInscriptionScalarFieldEnum
    having?: DemandeInscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DemandeInscriptionCountAggregateInputType | true
    _min?: DemandeInscriptionMinAggregateInputType
    _max?: DemandeInscriptionMaxAggregateInputType
  }

  export type DemandeInscriptionGroupByOutputType = {
    id: string
    nom: string
    prenom: string
    email: string
    telephone: string | null
    message: string | null
    formationId: string | null
    userId: string | null
    statut: $Enums.StatutInscription
    createdAt: Date
    updatedAt: Date
    _count: DemandeInscriptionCountAggregateOutputType | null
    _min: DemandeInscriptionMinAggregateOutputType | null
    _max: DemandeInscriptionMaxAggregateOutputType | null
  }

  type GetDemandeInscriptionGroupByPayload<T extends DemandeInscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DemandeInscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DemandeInscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DemandeInscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], DemandeInscriptionGroupByOutputType[P]>
        }
      >
    >


  export type DemandeInscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    message?: boolean
    formationId?: boolean
    userId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    formation?: boolean | DemandeInscription$formationArgs<ExtArgs>
    user?: boolean | DemandeInscription$userArgs<ExtArgs>
  }, ExtArgs["result"]["demandeInscription"]>

  export type DemandeInscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    message?: boolean
    formationId?: boolean
    userId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    formation?: boolean | DemandeInscription$formationArgs<ExtArgs>
    user?: boolean | DemandeInscription$userArgs<ExtArgs>
  }, ExtArgs["result"]["demandeInscription"]>

  export type DemandeInscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    message?: boolean
    formationId?: boolean
    userId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    formation?: boolean | DemandeInscription$formationArgs<ExtArgs>
    user?: boolean | DemandeInscription$userArgs<ExtArgs>
  }, ExtArgs["result"]["demandeInscription"]>

  export type DemandeInscriptionSelectScalar = {
    id?: boolean
    nom?: boolean
    prenom?: boolean
    email?: boolean
    telephone?: boolean
    message?: boolean
    formationId?: boolean
    userId?: boolean
    statut?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DemandeInscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "prenom" | "email" | "telephone" | "message" | "formationId" | "userId" | "statut" | "createdAt" | "updatedAt", ExtArgs["result"]["demandeInscription"]>
  export type DemandeInscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formation?: boolean | DemandeInscription$formationArgs<ExtArgs>
    user?: boolean | DemandeInscription$userArgs<ExtArgs>
  }
  export type DemandeInscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formation?: boolean | DemandeInscription$formationArgs<ExtArgs>
    user?: boolean | DemandeInscription$userArgs<ExtArgs>
  }
  export type DemandeInscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formation?: boolean | DemandeInscription$formationArgs<ExtArgs>
    user?: boolean | DemandeInscription$userArgs<ExtArgs>
  }

  export type $DemandeInscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DemandeInscription"
    objects: {
      formation: Prisma.$FormationPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      prenom: string
      email: string
      telephone: string | null
      message: string | null
      formationId: string | null
      userId: string | null
      statut: $Enums.StatutInscription
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["demandeInscription"]>
    composites: {}
  }

  type DemandeInscriptionGetPayload<S extends boolean | null | undefined | DemandeInscriptionDefaultArgs> = $Result.GetResult<Prisma.$DemandeInscriptionPayload, S>

  type DemandeInscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DemandeInscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DemandeInscriptionCountAggregateInputType | true
    }

  export interface DemandeInscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DemandeInscription'], meta: { name: 'DemandeInscription' } }
    /**
     * Find zero or one DemandeInscription that matches the filter.
     * @param {DemandeInscriptionFindUniqueArgs} args - Arguments to find a DemandeInscription
     * @example
     * // Get one DemandeInscription
     * const demandeInscription = await prisma.demandeInscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DemandeInscriptionFindUniqueArgs>(args: SelectSubset<T, DemandeInscriptionFindUniqueArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DemandeInscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DemandeInscriptionFindUniqueOrThrowArgs} args - Arguments to find a DemandeInscription
     * @example
     * // Get one DemandeInscription
     * const demandeInscription = await prisma.demandeInscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DemandeInscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, DemandeInscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DemandeInscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionFindFirstArgs} args - Arguments to find a DemandeInscription
     * @example
     * // Get one DemandeInscription
     * const demandeInscription = await prisma.demandeInscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DemandeInscriptionFindFirstArgs>(args?: SelectSubset<T, DemandeInscriptionFindFirstArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DemandeInscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionFindFirstOrThrowArgs} args - Arguments to find a DemandeInscription
     * @example
     * // Get one DemandeInscription
     * const demandeInscription = await prisma.demandeInscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DemandeInscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, DemandeInscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DemandeInscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DemandeInscriptions
     * const demandeInscriptions = await prisma.demandeInscription.findMany()
     * 
     * // Get first 10 DemandeInscriptions
     * const demandeInscriptions = await prisma.demandeInscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const demandeInscriptionWithIdOnly = await prisma.demandeInscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DemandeInscriptionFindManyArgs>(args?: SelectSubset<T, DemandeInscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DemandeInscription.
     * @param {DemandeInscriptionCreateArgs} args - Arguments to create a DemandeInscription.
     * @example
     * // Create one DemandeInscription
     * const DemandeInscription = await prisma.demandeInscription.create({
     *   data: {
     *     // ... data to create a DemandeInscription
     *   }
     * })
     * 
     */
    create<T extends DemandeInscriptionCreateArgs>(args: SelectSubset<T, DemandeInscriptionCreateArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DemandeInscriptions.
     * @param {DemandeInscriptionCreateManyArgs} args - Arguments to create many DemandeInscriptions.
     * @example
     * // Create many DemandeInscriptions
     * const demandeInscription = await prisma.demandeInscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DemandeInscriptionCreateManyArgs>(args?: SelectSubset<T, DemandeInscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DemandeInscriptions and returns the data saved in the database.
     * @param {DemandeInscriptionCreateManyAndReturnArgs} args - Arguments to create many DemandeInscriptions.
     * @example
     * // Create many DemandeInscriptions
     * const demandeInscription = await prisma.demandeInscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DemandeInscriptions and only return the `id`
     * const demandeInscriptionWithIdOnly = await prisma.demandeInscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DemandeInscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, DemandeInscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DemandeInscription.
     * @param {DemandeInscriptionDeleteArgs} args - Arguments to delete one DemandeInscription.
     * @example
     * // Delete one DemandeInscription
     * const DemandeInscription = await prisma.demandeInscription.delete({
     *   where: {
     *     // ... filter to delete one DemandeInscription
     *   }
     * })
     * 
     */
    delete<T extends DemandeInscriptionDeleteArgs>(args: SelectSubset<T, DemandeInscriptionDeleteArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DemandeInscription.
     * @param {DemandeInscriptionUpdateArgs} args - Arguments to update one DemandeInscription.
     * @example
     * // Update one DemandeInscription
     * const demandeInscription = await prisma.demandeInscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DemandeInscriptionUpdateArgs>(args: SelectSubset<T, DemandeInscriptionUpdateArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DemandeInscriptions.
     * @param {DemandeInscriptionDeleteManyArgs} args - Arguments to filter DemandeInscriptions to delete.
     * @example
     * // Delete a few DemandeInscriptions
     * const { count } = await prisma.demandeInscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DemandeInscriptionDeleteManyArgs>(args?: SelectSubset<T, DemandeInscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DemandeInscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DemandeInscriptions
     * const demandeInscription = await prisma.demandeInscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DemandeInscriptionUpdateManyArgs>(args: SelectSubset<T, DemandeInscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DemandeInscriptions and returns the data updated in the database.
     * @param {DemandeInscriptionUpdateManyAndReturnArgs} args - Arguments to update many DemandeInscriptions.
     * @example
     * // Update many DemandeInscriptions
     * const demandeInscription = await prisma.demandeInscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DemandeInscriptions and only return the `id`
     * const demandeInscriptionWithIdOnly = await prisma.demandeInscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DemandeInscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, DemandeInscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DemandeInscription.
     * @param {DemandeInscriptionUpsertArgs} args - Arguments to update or create a DemandeInscription.
     * @example
     * // Update or create a DemandeInscription
     * const demandeInscription = await prisma.demandeInscription.upsert({
     *   create: {
     *     // ... data to create a DemandeInscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DemandeInscription we want to update
     *   }
     * })
     */
    upsert<T extends DemandeInscriptionUpsertArgs>(args: SelectSubset<T, DemandeInscriptionUpsertArgs<ExtArgs>>): Prisma__DemandeInscriptionClient<$Result.GetResult<Prisma.$DemandeInscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DemandeInscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionCountArgs} args - Arguments to filter DemandeInscriptions to count.
     * @example
     * // Count the number of DemandeInscriptions
     * const count = await prisma.demandeInscription.count({
     *   where: {
     *     // ... the filter for the DemandeInscriptions we want to count
     *   }
     * })
    **/
    count<T extends DemandeInscriptionCountArgs>(
      args?: Subset<T, DemandeInscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DemandeInscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DemandeInscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DemandeInscriptionAggregateArgs>(args: Subset<T, DemandeInscriptionAggregateArgs>): Prisma.PrismaPromise<GetDemandeInscriptionAggregateType<T>>

    /**
     * Group by DemandeInscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemandeInscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DemandeInscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DemandeInscriptionGroupByArgs['orderBy'] }
        : { orderBy?: DemandeInscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DemandeInscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDemandeInscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DemandeInscription model
   */
  readonly fields: DemandeInscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DemandeInscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DemandeInscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    formation<T extends DemandeInscription$formationArgs<ExtArgs> = {}>(args?: Subset<T, DemandeInscription$formationArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends DemandeInscription$userArgs<ExtArgs> = {}>(args?: Subset<T, DemandeInscription$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DemandeInscription model
   */
  interface DemandeInscriptionFieldRefs {
    readonly id: FieldRef<"DemandeInscription", 'String'>
    readonly nom: FieldRef<"DemandeInscription", 'String'>
    readonly prenom: FieldRef<"DemandeInscription", 'String'>
    readonly email: FieldRef<"DemandeInscription", 'String'>
    readonly telephone: FieldRef<"DemandeInscription", 'String'>
    readonly message: FieldRef<"DemandeInscription", 'String'>
    readonly formationId: FieldRef<"DemandeInscription", 'String'>
    readonly userId: FieldRef<"DemandeInscription", 'String'>
    readonly statut: FieldRef<"DemandeInscription", 'StatutInscription'>
    readonly createdAt: FieldRef<"DemandeInscription", 'DateTime'>
    readonly updatedAt: FieldRef<"DemandeInscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DemandeInscription findUnique
   */
  export type DemandeInscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * Filter, which DemandeInscription to fetch.
     */
    where: DemandeInscriptionWhereUniqueInput
  }

  /**
   * DemandeInscription findUniqueOrThrow
   */
  export type DemandeInscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * Filter, which DemandeInscription to fetch.
     */
    where: DemandeInscriptionWhereUniqueInput
  }

  /**
   * DemandeInscription findFirst
   */
  export type DemandeInscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * Filter, which DemandeInscription to fetch.
     */
    where?: DemandeInscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemandeInscriptions to fetch.
     */
    orderBy?: DemandeInscriptionOrderByWithRelationInput | DemandeInscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DemandeInscriptions.
     */
    cursor?: DemandeInscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemandeInscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemandeInscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DemandeInscriptions.
     */
    distinct?: DemandeInscriptionScalarFieldEnum | DemandeInscriptionScalarFieldEnum[]
  }

  /**
   * DemandeInscription findFirstOrThrow
   */
  export type DemandeInscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * Filter, which DemandeInscription to fetch.
     */
    where?: DemandeInscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemandeInscriptions to fetch.
     */
    orderBy?: DemandeInscriptionOrderByWithRelationInput | DemandeInscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DemandeInscriptions.
     */
    cursor?: DemandeInscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemandeInscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemandeInscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DemandeInscriptions.
     */
    distinct?: DemandeInscriptionScalarFieldEnum | DemandeInscriptionScalarFieldEnum[]
  }

  /**
   * DemandeInscription findMany
   */
  export type DemandeInscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * Filter, which DemandeInscriptions to fetch.
     */
    where?: DemandeInscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DemandeInscriptions to fetch.
     */
    orderBy?: DemandeInscriptionOrderByWithRelationInput | DemandeInscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DemandeInscriptions.
     */
    cursor?: DemandeInscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DemandeInscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DemandeInscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DemandeInscriptions.
     */
    distinct?: DemandeInscriptionScalarFieldEnum | DemandeInscriptionScalarFieldEnum[]
  }

  /**
   * DemandeInscription create
   */
  export type DemandeInscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a DemandeInscription.
     */
    data: XOR<DemandeInscriptionCreateInput, DemandeInscriptionUncheckedCreateInput>
  }

  /**
   * DemandeInscription createMany
   */
  export type DemandeInscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DemandeInscriptions.
     */
    data: DemandeInscriptionCreateManyInput | DemandeInscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DemandeInscription createManyAndReturn
   */
  export type DemandeInscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many DemandeInscriptions.
     */
    data: DemandeInscriptionCreateManyInput | DemandeInscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DemandeInscription update
   */
  export type DemandeInscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a DemandeInscription.
     */
    data: XOR<DemandeInscriptionUpdateInput, DemandeInscriptionUncheckedUpdateInput>
    /**
     * Choose, which DemandeInscription to update.
     */
    where: DemandeInscriptionWhereUniqueInput
  }

  /**
   * DemandeInscription updateMany
   */
  export type DemandeInscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DemandeInscriptions.
     */
    data: XOR<DemandeInscriptionUpdateManyMutationInput, DemandeInscriptionUncheckedUpdateManyInput>
    /**
     * Filter which DemandeInscriptions to update
     */
    where?: DemandeInscriptionWhereInput
    /**
     * Limit how many DemandeInscriptions to update.
     */
    limit?: number
  }

  /**
   * DemandeInscription updateManyAndReturn
   */
  export type DemandeInscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * The data used to update DemandeInscriptions.
     */
    data: XOR<DemandeInscriptionUpdateManyMutationInput, DemandeInscriptionUncheckedUpdateManyInput>
    /**
     * Filter which DemandeInscriptions to update
     */
    where?: DemandeInscriptionWhereInput
    /**
     * Limit how many DemandeInscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DemandeInscription upsert
   */
  export type DemandeInscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the DemandeInscription to update in case it exists.
     */
    where: DemandeInscriptionWhereUniqueInput
    /**
     * In case the DemandeInscription found by the `where` argument doesn't exist, create a new DemandeInscription with this data.
     */
    create: XOR<DemandeInscriptionCreateInput, DemandeInscriptionUncheckedCreateInput>
    /**
     * In case the DemandeInscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DemandeInscriptionUpdateInput, DemandeInscriptionUncheckedUpdateInput>
  }

  /**
   * DemandeInscription delete
   */
  export type DemandeInscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
    /**
     * Filter which DemandeInscription to delete.
     */
    where: DemandeInscriptionWhereUniqueInput
  }

  /**
   * DemandeInscription deleteMany
   */
  export type DemandeInscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DemandeInscriptions to delete
     */
    where?: DemandeInscriptionWhereInput
    /**
     * Limit how many DemandeInscriptions to delete.
     */
    limit?: number
  }

  /**
   * DemandeInscription.formation
   */
  export type DemandeInscription$formationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    where?: FormationWhereInput
  }

  /**
   * DemandeInscription.user
   */
  export type DemandeInscription$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * DemandeInscription without action
   */
  export type DemandeInscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DemandeInscription
     */
    select?: DemandeInscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DemandeInscription
     */
    omit?: DemandeInscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemandeInscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    taille: number | null
  }

  export type DocumentSumAggregateOutputType = {
    taille: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    nom: string | null
    url: string | null
    taille: number | null
    mimeType: string | null
    uploaderId: string | null
    formationId: string | null
    public: boolean | null
    createdAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    url: string | null
    taille: number | null
    mimeType: string | null
    uploaderId: string | null
    formationId: string | null
    public: boolean | null
    createdAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    nom: number
    url: number
    taille: number
    mimeType: number
    uploaderId: number
    formationId: number
    public: number
    createdAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    taille?: true
  }

  export type DocumentSumAggregateInputType = {
    taille?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    nom?: true
    url?: true
    taille?: true
    mimeType?: true
    uploaderId?: true
    formationId?: true
    public?: true
    createdAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    nom?: true
    url?: true
    taille?: true
    mimeType?: true
    uploaderId?: true
    formationId?: true
    public?: true
    createdAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    nom?: true
    url?: true
    taille?: true
    mimeType?: true
    uploaderId?: true
    formationId?: true
    public?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    nom: string
    url: string
    taille: number | null
    mimeType: string | null
    uploaderId: string
    formationId: string | null
    public: boolean
    createdAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    url?: boolean
    taille?: boolean
    mimeType?: boolean
    uploaderId?: boolean
    formationId?: boolean
    public?: boolean
    createdAt?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | Document$formationArgs<ExtArgs>
    signatures?: boolean | Document$signaturesArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    url?: boolean
    taille?: boolean
    mimeType?: boolean
    uploaderId?: boolean
    formationId?: boolean
    public?: boolean
    createdAt?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | Document$formationArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    url?: boolean
    taille?: boolean
    mimeType?: boolean
    uploaderId?: boolean
    formationId?: boolean
    public?: boolean
    createdAt?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | Document$formationArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    nom?: boolean
    url?: boolean
    taille?: boolean
    mimeType?: boolean
    uploaderId?: boolean
    formationId?: boolean
    public?: boolean
    createdAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "url" | "taille" | "mimeType" | "uploaderId" | "formationId" | "public" | "createdAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | Document$formationArgs<ExtArgs>
    signatures?: boolean | Document$signaturesArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | Document$formationArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    formation?: boolean | Document$formationArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      uploader: Prisma.$UserPayload<ExtArgs>
      formation: Prisma.$FormationPayload<ExtArgs> | null
      signatures: Prisma.$SignaturePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nom: string
      url: string
      taille: number | null
      mimeType: string | null
      uploaderId: string
      formationId: string | null
      public: boolean
      createdAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    formation<T extends Document$formationArgs<ExtArgs> = {}>(args?: Subset<T, Document$formationArgs<ExtArgs>>): Prisma__FormationClient<$Result.GetResult<Prisma.$FormationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    signatures<T extends Document$signaturesArgs<ExtArgs> = {}>(args?: Subset<T, Document$signaturesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly nom: FieldRef<"Document", 'String'>
    readonly url: FieldRef<"Document", 'String'>
    readonly taille: FieldRef<"Document", 'Int'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly uploaderId: FieldRef<"Document", 'String'>
    readonly formationId: FieldRef<"Document", 'String'>
    readonly public: FieldRef<"Document", 'Boolean'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.formation
   */
  export type Document$formationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formation
     */
    select?: FormationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formation
     */
    omit?: FormationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormationInclude<ExtArgs> | null
    where?: FormationWhereInput
  }

  /**
   * Document.signatures
   */
  export type Document$signaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    where?: SignatureWhereInput
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    cursor?: SignatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Signature
   */

  export type AggregateSignature = {
    _count: SignatureCountAggregateOutputType | null
    _min: SignatureMinAggregateOutputType | null
    _max: SignatureMaxAggregateOutputType | null
  }

  export type SignatureMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    userId: string | null
    signedAt: Date | null
    signatureUrl: string | null
  }

  export type SignatureMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    userId: string | null
    signedAt: Date | null
    signatureUrl: string | null
  }

  export type SignatureCountAggregateOutputType = {
    id: number
    documentId: number
    userId: number
    signedAt: number
    signatureUrl: number
    _all: number
  }


  export type SignatureMinAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    signedAt?: true
    signatureUrl?: true
  }

  export type SignatureMaxAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    signedAt?: true
    signatureUrl?: true
  }

  export type SignatureCountAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    signedAt?: true
    signatureUrl?: true
    _all?: true
  }

  export type SignatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signature to aggregate.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Signatures
    **/
    _count?: true | SignatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignatureMaxAggregateInputType
  }

  export type GetSignatureAggregateType<T extends SignatureAggregateArgs> = {
        [P in keyof T & keyof AggregateSignature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignature[P]>
      : GetScalarType<T[P], AggregateSignature[P]>
  }




  export type SignatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignatureWhereInput
    orderBy?: SignatureOrderByWithAggregationInput | SignatureOrderByWithAggregationInput[]
    by: SignatureScalarFieldEnum[] | SignatureScalarFieldEnum
    having?: SignatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignatureCountAggregateInputType | true
    _min?: SignatureMinAggregateInputType
    _max?: SignatureMaxAggregateInputType
  }

  export type SignatureGroupByOutputType = {
    id: string
    documentId: string
    userId: string
    signedAt: Date
    signatureUrl: string | null
    _count: SignatureCountAggregateOutputType | null
    _min: SignatureMinAggregateOutputType | null
    _max: SignatureMaxAggregateOutputType | null
  }

  type GetSignatureGroupByPayload<T extends SignatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignatureGroupByOutputType[P]>
            : GetScalarType<T[P], SignatureGroupByOutputType[P]>
        }
      >
    >


  export type SignatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    userId?: boolean
    signedAt?: boolean
    signatureUrl?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signature"]>

  export type SignatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    userId?: boolean
    signedAt?: boolean
    signatureUrl?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signature"]>

  export type SignatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    userId?: boolean
    signedAt?: boolean
    signatureUrl?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signature"]>

  export type SignatureSelectScalar = {
    id?: boolean
    documentId?: boolean
    userId?: boolean
    signedAt?: boolean
    signatureUrl?: boolean
  }

  export type SignatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "userId" | "signedAt" | "signatureUrl", ExtArgs["result"]["signature"]>
  export type SignatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SignatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SignatureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SignaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Signature"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      userId: string
      signedAt: Date
      signatureUrl: string | null
    }, ExtArgs["result"]["signature"]>
    composites: {}
  }

  type SignatureGetPayload<S extends boolean | null | undefined | SignatureDefaultArgs> = $Result.GetResult<Prisma.$SignaturePayload, S>

  type SignatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SignatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SignatureCountAggregateInputType | true
    }

  export interface SignatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Signature'], meta: { name: 'Signature' } }
    /**
     * Find zero or one Signature that matches the filter.
     * @param {SignatureFindUniqueArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignatureFindUniqueArgs>(args: SelectSubset<T, SignatureFindUniqueArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Signature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SignatureFindUniqueOrThrowArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignatureFindUniqueOrThrowArgs>(args: SelectSubset<T, SignatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindFirstArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignatureFindFirstArgs>(args?: SelectSubset<T, SignatureFindFirstArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Signature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindFirstOrThrowArgs} args - Arguments to find a Signature
     * @example
     * // Get one Signature
     * const signature = await prisma.signature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignatureFindFirstOrThrowArgs>(args?: SelectSubset<T, SignatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Signatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Signatures
     * const signatures = await prisma.signature.findMany()
     * 
     * // Get first 10 Signatures
     * const signatures = await prisma.signature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signatureWithIdOnly = await prisma.signature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignatureFindManyArgs>(args?: SelectSubset<T, SignatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Signature.
     * @param {SignatureCreateArgs} args - Arguments to create a Signature.
     * @example
     * // Create one Signature
     * const Signature = await prisma.signature.create({
     *   data: {
     *     // ... data to create a Signature
     *   }
     * })
     * 
     */
    create<T extends SignatureCreateArgs>(args: SelectSubset<T, SignatureCreateArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Signatures.
     * @param {SignatureCreateManyArgs} args - Arguments to create many Signatures.
     * @example
     * // Create many Signatures
     * const signature = await prisma.signature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignatureCreateManyArgs>(args?: SelectSubset<T, SignatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Signatures and returns the data saved in the database.
     * @param {SignatureCreateManyAndReturnArgs} args - Arguments to create many Signatures.
     * @example
     * // Create many Signatures
     * const signature = await prisma.signature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Signatures and only return the `id`
     * const signatureWithIdOnly = await prisma.signature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignatureCreateManyAndReturnArgs>(args?: SelectSubset<T, SignatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Signature.
     * @param {SignatureDeleteArgs} args - Arguments to delete one Signature.
     * @example
     * // Delete one Signature
     * const Signature = await prisma.signature.delete({
     *   where: {
     *     // ... filter to delete one Signature
     *   }
     * })
     * 
     */
    delete<T extends SignatureDeleteArgs>(args: SelectSubset<T, SignatureDeleteArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Signature.
     * @param {SignatureUpdateArgs} args - Arguments to update one Signature.
     * @example
     * // Update one Signature
     * const signature = await prisma.signature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignatureUpdateArgs>(args: SelectSubset<T, SignatureUpdateArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Signatures.
     * @param {SignatureDeleteManyArgs} args - Arguments to filter Signatures to delete.
     * @example
     * // Delete a few Signatures
     * const { count } = await prisma.signature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignatureDeleteManyArgs>(args?: SelectSubset<T, SignatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Signatures
     * const signature = await prisma.signature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignatureUpdateManyArgs>(args: SelectSubset<T, SignatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Signatures and returns the data updated in the database.
     * @param {SignatureUpdateManyAndReturnArgs} args - Arguments to update many Signatures.
     * @example
     * // Update many Signatures
     * const signature = await prisma.signature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Signatures and only return the `id`
     * const signatureWithIdOnly = await prisma.signature.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SignatureUpdateManyAndReturnArgs>(args: SelectSubset<T, SignatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Signature.
     * @param {SignatureUpsertArgs} args - Arguments to update or create a Signature.
     * @example
     * // Update or create a Signature
     * const signature = await prisma.signature.upsert({
     *   create: {
     *     // ... data to create a Signature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Signature we want to update
     *   }
     * })
     */
    upsert<T extends SignatureUpsertArgs>(args: SelectSubset<T, SignatureUpsertArgs<ExtArgs>>): Prisma__SignatureClient<$Result.GetResult<Prisma.$SignaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Signatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureCountArgs} args - Arguments to filter Signatures to count.
     * @example
     * // Count the number of Signatures
     * const count = await prisma.signature.count({
     *   where: {
     *     // ... the filter for the Signatures we want to count
     *   }
     * })
    **/
    count<T extends SignatureCountArgs>(
      args?: Subset<T, SignatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Signature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SignatureAggregateArgs>(args: Subset<T, SignatureAggregateArgs>): Prisma.PrismaPromise<GetSignatureAggregateType<T>>

    /**
     * Group by Signature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SignatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignatureGroupByArgs['orderBy'] }
        : { orderBy?: SignatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SignatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Signature model
   */
  readonly fields: SignatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Signature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Signature model
   */
  interface SignatureFieldRefs {
    readonly id: FieldRef<"Signature", 'String'>
    readonly documentId: FieldRef<"Signature", 'String'>
    readonly userId: FieldRef<"Signature", 'String'>
    readonly signedAt: FieldRef<"Signature", 'DateTime'>
    readonly signatureUrl: FieldRef<"Signature", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Signature findUnique
   */
  export type SignatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature findUniqueOrThrow
   */
  export type SignatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature findFirst
   */
  export type SignatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature findFirstOrThrow
   */
  export type SignatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * Filter, which Signature to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature findMany
   */
  export type SignatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * Filter, which Signatures to fetch.
     */
    where?: SignatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Signatures to fetch.
     */
    orderBy?: SignatureOrderByWithRelationInput | SignatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Signatures.
     */
    cursor?: SignatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Signatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Signatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Signatures.
     */
    distinct?: SignatureScalarFieldEnum | SignatureScalarFieldEnum[]
  }

  /**
   * Signature create
   */
  export type SignatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * The data needed to create a Signature.
     */
    data: XOR<SignatureCreateInput, SignatureUncheckedCreateInput>
  }

  /**
   * Signature createMany
   */
  export type SignatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Signatures.
     */
    data: SignatureCreateManyInput | SignatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Signature createManyAndReturn
   */
  export type SignatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data used to create many Signatures.
     */
    data: SignatureCreateManyInput | SignatureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Signature update
   */
  export type SignatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * The data needed to update a Signature.
     */
    data: XOR<SignatureUpdateInput, SignatureUncheckedUpdateInput>
    /**
     * Choose, which Signature to update.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature updateMany
   */
  export type SignatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Signatures.
     */
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyInput>
    /**
     * Filter which Signatures to update
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to update.
     */
    limit?: number
  }

  /**
   * Signature updateManyAndReturn
   */
  export type SignatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * The data used to update Signatures.
     */
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyInput>
    /**
     * Filter which Signatures to update
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Signature upsert
   */
  export type SignatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * The filter to search for the Signature to update in case it exists.
     */
    where: SignatureWhereUniqueInput
    /**
     * In case the Signature found by the `where` argument doesn't exist, create a new Signature with this data.
     */
    create: XOR<SignatureCreateInput, SignatureUncheckedCreateInput>
    /**
     * In case the Signature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignatureUpdateInput, SignatureUncheckedUpdateInput>
  }

  /**
   * Signature delete
   */
  export type SignatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
    /**
     * Filter which Signature to delete.
     */
    where: SignatureWhereUniqueInput
  }

  /**
   * Signature deleteMany
   */
  export type SignatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Signatures to delete
     */
    where?: SignatureWhereInput
    /**
     * Limit how many Signatures to delete.
     */
    limit?: number
  }

  /**
   * Signature without action
   */
  export type SignatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Signature
     */
    select?: SignatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Signature
     */
    omit?: SignatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignatureInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    expediteurId: string | null
    sujet: string | null
    contenu: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    expediteurId: string | null
    sujet: string | null
    contenu: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    expediteurId: number
    sujet: number
    contenu: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    expediteurId?: true
    sujet?: true
    contenu?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    expediteurId?: true
    sujet?: true
    contenu?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    expediteurId?: true
    sujet?: true
    contenu?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    expediteurId: string
    sujet: string | null
    contenu: string
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expediteurId?: boolean
    sujet?: boolean
    contenu?: boolean
    createdAt?: boolean
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataires?: boolean | Message$destinatairesArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expediteurId?: boolean
    sujet?: boolean
    contenu?: boolean
    createdAt?: boolean
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expediteurId?: boolean
    sujet?: boolean
    contenu?: boolean
    createdAt?: boolean
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    expediteurId?: boolean
    sujet?: boolean
    contenu?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expediteurId" | "sujet" | "contenu" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
    destinataires?: boolean | Message$destinatairesArgs<ExtArgs>
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expediteur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      expediteur: Prisma.$UserPayload<ExtArgs>
      destinataires: Prisma.$MessageDestinatairePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expediteurId: string
      sujet: string | null
      contenu: string
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expediteur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    destinataires<T extends Message$destinatairesArgs<ExtArgs> = {}>(args?: Subset<T, Message$destinatairesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly expediteurId: FieldRef<"Message", 'String'>
    readonly sujet: FieldRef<"Message", 'String'>
    readonly contenu: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message.destinataires
   */
  export type Message$destinatairesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    where?: MessageDestinataireWhereInput
    orderBy?: MessageDestinataireOrderByWithRelationInput | MessageDestinataireOrderByWithRelationInput[]
    cursor?: MessageDestinataireWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageDestinataireScalarFieldEnum | MessageDestinataireScalarFieldEnum[]
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model MessageDestinataire
   */

  export type AggregateMessageDestinataire = {
    _count: MessageDestinataireCountAggregateOutputType | null
    _min: MessageDestinataireMinAggregateOutputType | null
    _max: MessageDestinataireMaxAggregateOutputType | null
  }

  export type MessageDestinataireMinAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    lu: boolean | null
    luAt: Date | null
  }

  export type MessageDestinataireMaxAggregateOutputType = {
    id: string | null
    messageId: string | null
    userId: string | null
    lu: boolean | null
    luAt: Date | null
  }

  export type MessageDestinataireCountAggregateOutputType = {
    id: number
    messageId: number
    userId: number
    lu: number
    luAt: number
    _all: number
  }


  export type MessageDestinataireMinAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    lu?: true
    luAt?: true
  }

  export type MessageDestinataireMaxAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    lu?: true
    luAt?: true
  }

  export type MessageDestinataireCountAggregateInputType = {
    id?: true
    messageId?: true
    userId?: true
    lu?: true
    luAt?: true
    _all?: true
  }

  export type MessageDestinataireAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageDestinataire to aggregate.
     */
    where?: MessageDestinataireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDestinataires to fetch.
     */
    orderBy?: MessageDestinataireOrderByWithRelationInput | MessageDestinataireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageDestinataireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDestinataires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDestinataires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageDestinataires
    **/
    _count?: true | MessageDestinataireCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageDestinataireMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageDestinataireMaxAggregateInputType
  }

  export type GetMessageDestinataireAggregateType<T extends MessageDestinataireAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageDestinataire]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageDestinataire[P]>
      : GetScalarType<T[P], AggregateMessageDestinataire[P]>
  }




  export type MessageDestinataireGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageDestinataireWhereInput
    orderBy?: MessageDestinataireOrderByWithAggregationInput | MessageDestinataireOrderByWithAggregationInput[]
    by: MessageDestinataireScalarFieldEnum[] | MessageDestinataireScalarFieldEnum
    having?: MessageDestinataireScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageDestinataireCountAggregateInputType | true
    _min?: MessageDestinataireMinAggregateInputType
    _max?: MessageDestinataireMaxAggregateInputType
  }

  export type MessageDestinataireGroupByOutputType = {
    id: string
    messageId: string
    userId: string
    lu: boolean
    luAt: Date | null
    _count: MessageDestinataireCountAggregateOutputType | null
    _min: MessageDestinataireMinAggregateOutputType | null
    _max: MessageDestinataireMaxAggregateOutputType | null
  }

  type GetMessageDestinataireGroupByPayload<T extends MessageDestinataireGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageDestinataireGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageDestinataireGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageDestinataireGroupByOutputType[P]>
            : GetScalarType<T[P], MessageDestinataireGroupByOutputType[P]>
        }
      >
    >


  export type MessageDestinataireSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    lu?: boolean
    luAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageDestinataire"]>

  export type MessageDestinataireSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    lu?: boolean
    luAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageDestinataire"]>

  export type MessageDestinataireSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    userId?: boolean
    lu?: boolean
    luAt?: boolean
    message?: boolean | MessageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageDestinataire"]>

  export type MessageDestinataireSelectScalar = {
    id?: boolean
    messageId?: boolean
    userId?: boolean
    lu?: boolean
    luAt?: boolean
  }

  export type MessageDestinataireOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "userId" | "lu" | "luAt", ExtArgs["result"]["messageDestinataire"]>
  export type MessageDestinataireInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageDestinataireIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageDestinataireIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    message?: boolean | MessageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessageDestinatairePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageDestinataire"
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      messageId: string
      userId: string
      lu: boolean
      luAt: Date | null
    }, ExtArgs["result"]["messageDestinataire"]>
    composites: {}
  }

  type MessageDestinataireGetPayload<S extends boolean | null | undefined | MessageDestinataireDefaultArgs> = $Result.GetResult<Prisma.$MessageDestinatairePayload, S>

  type MessageDestinataireCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageDestinataireFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageDestinataireCountAggregateInputType | true
    }

  export interface MessageDestinataireDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageDestinataire'], meta: { name: 'MessageDestinataire' } }
    /**
     * Find zero or one MessageDestinataire that matches the filter.
     * @param {MessageDestinataireFindUniqueArgs} args - Arguments to find a MessageDestinataire
     * @example
     * // Get one MessageDestinataire
     * const messageDestinataire = await prisma.messageDestinataire.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageDestinataireFindUniqueArgs>(args: SelectSubset<T, MessageDestinataireFindUniqueArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageDestinataire that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageDestinataireFindUniqueOrThrowArgs} args - Arguments to find a MessageDestinataire
     * @example
     * // Get one MessageDestinataire
     * const messageDestinataire = await prisma.messageDestinataire.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageDestinataireFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageDestinataireFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageDestinataire that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireFindFirstArgs} args - Arguments to find a MessageDestinataire
     * @example
     * // Get one MessageDestinataire
     * const messageDestinataire = await prisma.messageDestinataire.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageDestinataireFindFirstArgs>(args?: SelectSubset<T, MessageDestinataireFindFirstArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageDestinataire that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireFindFirstOrThrowArgs} args - Arguments to find a MessageDestinataire
     * @example
     * // Get one MessageDestinataire
     * const messageDestinataire = await prisma.messageDestinataire.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageDestinataireFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageDestinataireFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageDestinataires that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageDestinataires
     * const messageDestinataires = await prisma.messageDestinataire.findMany()
     * 
     * // Get first 10 MessageDestinataires
     * const messageDestinataires = await prisma.messageDestinataire.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageDestinataireWithIdOnly = await prisma.messageDestinataire.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageDestinataireFindManyArgs>(args?: SelectSubset<T, MessageDestinataireFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageDestinataire.
     * @param {MessageDestinataireCreateArgs} args - Arguments to create a MessageDestinataire.
     * @example
     * // Create one MessageDestinataire
     * const MessageDestinataire = await prisma.messageDestinataire.create({
     *   data: {
     *     // ... data to create a MessageDestinataire
     *   }
     * })
     * 
     */
    create<T extends MessageDestinataireCreateArgs>(args: SelectSubset<T, MessageDestinataireCreateArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageDestinataires.
     * @param {MessageDestinataireCreateManyArgs} args - Arguments to create many MessageDestinataires.
     * @example
     * // Create many MessageDestinataires
     * const messageDestinataire = await prisma.messageDestinataire.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageDestinataireCreateManyArgs>(args?: SelectSubset<T, MessageDestinataireCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageDestinataires and returns the data saved in the database.
     * @param {MessageDestinataireCreateManyAndReturnArgs} args - Arguments to create many MessageDestinataires.
     * @example
     * // Create many MessageDestinataires
     * const messageDestinataire = await prisma.messageDestinataire.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageDestinataires and only return the `id`
     * const messageDestinataireWithIdOnly = await prisma.messageDestinataire.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageDestinataireCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageDestinataireCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageDestinataire.
     * @param {MessageDestinataireDeleteArgs} args - Arguments to delete one MessageDestinataire.
     * @example
     * // Delete one MessageDestinataire
     * const MessageDestinataire = await prisma.messageDestinataire.delete({
     *   where: {
     *     // ... filter to delete one MessageDestinataire
     *   }
     * })
     * 
     */
    delete<T extends MessageDestinataireDeleteArgs>(args: SelectSubset<T, MessageDestinataireDeleteArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageDestinataire.
     * @param {MessageDestinataireUpdateArgs} args - Arguments to update one MessageDestinataire.
     * @example
     * // Update one MessageDestinataire
     * const messageDestinataire = await prisma.messageDestinataire.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageDestinataireUpdateArgs>(args: SelectSubset<T, MessageDestinataireUpdateArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageDestinataires.
     * @param {MessageDestinataireDeleteManyArgs} args - Arguments to filter MessageDestinataires to delete.
     * @example
     * // Delete a few MessageDestinataires
     * const { count } = await prisma.messageDestinataire.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDestinataireDeleteManyArgs>(args?: SelectSubset<T, MessageDestinataireDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageDestinataires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageDestinataires
     * const messageDestinataire = await prisma.messageDestinataire.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageDestinataireUpdateManyArgs>(args: SelectSubset<T, MessageDestinataireUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageDestinataires and returns the data updated in the database.
     * @param {MessageDestinataireUpdateManyAndReturnArgs} args - Arguments to update many MessageDestinataires.
     * @example
     * // Update many MessageDestinataires
     * const messageDestinataire = await prisma.messageDestinataire.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageDestinataires and only return the `id`
     * const messageDestinataireWithIdOnly = await prisma.messageDestinataire.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageDestinataireUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageDestinataireUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageDestinataire.
     * @param {MessageDestinataireUpsertArgs} args - Arguments to update or create a MessageDestinataire.
     * @example
     * // Update or create a MessageDestinataire
     * const messageDestinataire = await prisma.messageDestinataire.upsert({
     *   create: {
     *     // ... data to create a MessageDestinataire
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageDestinataire we want to update
     *   }
     * })
     */
    upsert<T extends MessageDestinataireUpsertArgs>(args: SelectSubset<T, MessageDestinataireUpsertArgs<ExtArgs>>): Prisma__MessageDestinataireClient<$Result.GetResult<Prisma.$MessageDestinatairePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageDestinataires.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireCountArgs} args - Arguments to filter MessageDestinataires to count.
     * @example
     * // Count the number of MessageDestinataires
     * const count = await prisma.messageDestinataire.count({
     *   where: {
     *     // ... the filter for the MessageDestinataires we want to count
     *   }
     * })
    **/
    count<T extends MessageDestinataireCountArgs>(
      args?: Subset<T, MessageDestinataireCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageDestinataireCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageDestinataire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageDestinataireAggregateArgs>(args: Subset<T, MessageDestinataireAggregateArgs>): Prisma.PrismaPromise<GetMessageDestinataireAggregateType<T>>

    /**
     * Group by MessageDestinataire.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageDestinataireGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageDestinataireGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageDestinataireGroupByArgs['orderBy'] }
        : { orderBy?: MessageDestinataireGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageDestinataireGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageDestinataireGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageDestinataire model
   */
  readonly fields: MessageDestinataireFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageDestinataire.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageDestinataireClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageDefaultArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageDestinataire model
   */
  interface MessageDestinataireFieldRefs {
    readonly id: FieldRef<"MessageDestinataire", 'String'>
    readonly messageId: FieldRef<"MessageDestinataire", 'String'>
    readonly userId: FieldRef<"MessageDestinataire", 'String'>
    readonly lu: FieldRef<"MessageDestinataire", 'Boolean'>
    readonly luAt: FieldRef<"MessageDestinataire", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageDestinataire findUnique
   */
  export type MessageDestinataireFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * Filter, which MessageDestinataire to fetch.
     */
    where: MessageDestinataireWhereUniqueInput
  }

  /**
   * MessageDestinataire findUniqueOrThrow
   */
  export type MessageDestinataireFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * Filter, which MessageDestinataire to fetch.
     */
    where: MessageDestinataireWhereUniqueInput
  }

  /**
   * MessageDestinataire findFirst
   */
  export type MessageDestinataireFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * Filter, which MessageDestinataire to fetch.
     */
    where?: MessageDestinataireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDestinataires to fetch.
     */
    orderBy?: MessageDestinataireOrderByWithRelationInput | MessageDestinataireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageDestinataires.
     */
    cursor?: MessageDestinataireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDestinataires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDestinataires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageDestinataires.
     */
    distinct?: MessageDestinataireScalarFieldEnum | MessageDestinataireScalarFieldEnum[]
  }

  /**
   * MessageDestinataire findFirstOrThrow
   */
  export type MessageDestinataireFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * Filter, which MessageDestinataire to fetch.
     */
    where?: MessageDestinataireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDestinataires to fetch.
     */
    orderBy?: MessageDestinataireOrderByWithRelationInput | MessageDestinataireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageDestinataires.
     */
    cursor?: MessageDestinataireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDestinataires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDestinataires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageDestinataires.
     */
    distinct?: MessageDestinataireScalarFieldEnum | MessageDestinataireScalarFieldEnum[]
  }

  /**
   * MessageDestinataire findMany
   */
  export type MessageDestinataireFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * Filter, which MessageDestinataires to fetch.
     */
    where?: MessageDestinataireWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageDestinataires to fetch.
     */
    orderBy?: MessageDestinataireOrderByWithRelationInput | MessageDestinataireOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageDestinataires.
     */
    cursor?: MessageDestinataireWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageDestinataires from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageDestinataires.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageDestinataires.
     */
    distinct?: MessageDestinataireScalarFieldEnum | MessageDestinataireScalarFieldEnum[]
  }

  /**
   * MessageDestinataire create
   */
  export type MessageDestinataireCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageDestinataire.
     */
    data: XOR<MessageDestinataireCreateInput, MessageDestinataireUncheckedCreateInput>
  }

  /**
   * MessageDestinataire createMany
   */
  export type MessageDestinataireCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageDestinataires.
     */
    data: MessageDestinataireCreateManyInput | MessageDestinataireCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageDestinataire createManyAndReturn
   */
  export type MessageDestinataireCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * The data used to create many MessageDestinataires.
     */
    data: MessageDestinataireCreateManyInput | MessageDestinataireCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageDestinataire update
   */
  export type MessageDestinataireUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageDestinataire.
     */
    data: XOR<MessageDestinataireUpdateInput, MessageDestinataireUncheckedUpdateInput>
    /**
     * Choose, which MessageDestinataire to update.
     */
    where: MessageDestinataireWhereUniqueInput
  }

  /**
   * MessageDestinataire updateMany
   */
  export type MessageDestinataireUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageDestinataires.
     */
    data: XOR<MessageDestinataireUpdateManyMutationInput, MessageDestinataireUncheckedUpdateManyInput>
    /**
     * Filter which MessageDestinataires to update
     */
    where?: MessageDestinataireWhereInput
    /**
     * Limit how many MessageDestinataires to update.
     */
    limit?: number
  }

  /**
   * MessageDestinataire updateManyAndReturn
   */
  export type MessageDestinataireUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * The data used to update MessageDestinataires.
     */
    data: XOR<MessageDestinataireUpdateManyMutationInput, MessageDestinataireUncheckedUpdateManyInput>
    /**
     * Filter which MessageDestinataires to update
     */
    where?: MessageDestinataireWhereInput
    /**
     * Limit how many MessageDestinataires to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageDestinataire upsert
   */
  export type MessageDestinataireUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageDestinataire to update in case it exists.
     */
    where: MessageDestinataireWhereUniqueInput
    /**
     * In case the MessageDestinataire found by the `where` argument doesn't exist, create a new MessageDestinataire with this data.
     */
    create: XOR<MessageDestinataireCreateInput, MessageDestinataireUncheckedCreateInput>
    /**
     * In case the MessageDestinataire was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageDestinataireUpdateInput, MessageDestinataireUncheckedUpdateInput>
  }

  /**
   * MessageDestinataire delete
   */
  export type MessageDestinataireDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
    /**
     * Filter which MessageDestinataire to delete.
     */
    where: MessageDestinataireWhereUniqueInput
  }

  /**
   * MessageDestinataire deleteMany
   */
  export type MessageDestinataireDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageDestinataires to delete
     */
    where?: MessageDestinataireWhereInput
    /**
     * Limit how many MessageDestinataires to delete.
     */
    limit?: number
  }

  /**
   * MessageDestinataire without action
   */
  export type MessageDestinataireDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageDestinataire
     */
    select?: MessageDestinataireSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageDestinataire
     */
    omit?: MessageDestinataireOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageDestinataireInclude<ExtArgs> | null
  }


  /**
   * Model Covoiturage
   */

  export type AggregateCovoiturage = {
    _count: CovoiturageCountAggregateOutputType | null
    _avg: CovoiturageAvgAggregateOutputType | null
    _sum: CovoiturageSumAggregateOutputType | null
    _min: CovoiturageMinAggregateOutputType | null
    _max: CovoiturageMaxAggregateOutputType | null
  }

  export type CovoiturageAvgAggregateOutputType = {
    places: number | null
  }

  export type CovoiturageSumAggregateOutputType = {
    places: number | null
  }

  export type CovoiturageMinAggregateOutputType = {
    id: string | null
    conducteurId: string | null
    depart: string | null
    destination: string | null
    dateDepart: Date | null
    places: number | null
    statut: $Enums.StatutCovoiturage | null
    commentaire: string | null
    createdAt: Date | null
  }

  export type CovoiturageMaxAggregateOutputType = {
    id: string | null
    conducteurId: string | null
    depart: string | null
    destination: string | null
    dateDepart: Date | null
    places: number | null
    statut: $Enums.StatutCovoiturage | null
    commentaire: string | null
    createdAt: Date | null
  }

  export type CovoiturageCountAggregateOutputType = {
    id: number
    conducteurId: number
    depart: number
    destination: number
    dateDepart: number
    places: number
    statut: number
    commentaire: number
    createdAt: number
    _all: number
  }


  export type CovoiturageAvgAggregateInputType = {
    places?: true
  }

  export type CovoiturageSumAggregateInputType = {
    places?: true
  }

  export type CovoiturageMinAggregateInputType = {
    id?: true
    conducteurId?: true
    depart?: true
    destination?: true
    dateDepart?: true
    places?: true
    statut?: true
    commentaire?: true
    createdAt?: true
  }

  export type CovoiturageMaxAggregateInputType = {
    id?: true
    conducteurId?: true
    depart?: true
    destination?: true
    dateDepart?: true
    places?: true
    statut?: true
    commentaire?: true
    createdAt?: true
  }

  export type CovoiturageCountAggregateInputType = {
    id?: true
    conducteurId?: true
    depart?: true
    destination?: true
    dateDepart?: true
    places?: true
    statut?: true
    commentaire?: true
    createdAt?: true
    _all?: true
  }

  export type CovoiturageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Covoiturage to aggregate.
     */
    where?: CovoiturageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Covoiturages to fetch.
     */
    orderBy?: CovoiturageOrderByWithRelationInput | CovoiturageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CovoiturageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Covoiturages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Covoiturages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Covoiturages
    **/
    _count?: true | CovoiturageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CovoiturageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CovoiturageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CovoiturageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CovoiturageMaxAggregateInputType
  }

  export type GetCovoiturageAggregateType<T extends CovoiturageAggregateArgs> = {
        [P in keyof T & keyof AggregateCovoiturage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCovoiturage[P]>
      : GetScalarType<T[P], AggregateCovoiturage[P]>
  }




  export type CovoiturageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CovoiturageWhereInput
    orderBy?: CovoiturageOrderByWithAggregationInput | CovoiturageOrderByWithAggregationInput[]
    by: CovoiturageScalarFieldEnum[] | CovoiturageScalarFieldEnum
    having?: CovoiturageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CovoiturageCountAggregateInputType | true
    _avg?: CovoiturageAvgAggregateInputType
    _sum?: CovoiturageSumAggregateInputType
    _min?: CovoiturageMinAggregateInputType
    _max?: CovoiturageMaxAggregateInputType
  }

  export type CovoiturageGroupByOutputType = {
    id: string
    conducteurId: string
    depart: string
    destination: string
    dateDepart: Date
    places: number
    statut: $Enums.StatutCovoiturage
    commentaire: string | null
    createdAt: Date
    _count: CovoiturageCountAggregateOutputType | null
    _avg: CovoiturageAvgAggregateOutputType | null
    _sum: CovoiturageSumAggregateOutputType | null
    _min: CovoiturageMinAggregateOutputType | null
    _max: CovoiturageMaxAggregateOutputType | null
  }

  type GetCovoiturageGroupByPayload<T extends CovoiturageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CovoiturageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CovoiturageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CovoiturageGroupByOutputType[P]>
            : GetScalarType<T[P], CovoiturageGroupByOutputType[P]>
        }
      >
    >


  export type CovoiturageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conducteurId?: boolean
    depart?: boolean
    destination?: boolean
    dateDepart?: boolean
    places?: boolean
    statut?: boolean
    commentaire?: boolean
    createdAt?: boolean
    conducteur?: boolean | UserDefaultArgs<ExtArgs>
    passagers?: boolean | Covoiturage$passagersArgs<ExtArgs>
    _count?: boolean | CovoiturageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["covoiturage"]>

  export type CovoiturageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conducteurId?: boolean
    depart?: boolean
    destination?: boolean
    dateDepart?: boolean
    places?: boolean
    statut?: boolean
    commentaire?: boolean
    createdAt?: boolean
    conducteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["covoiturage"]>

  export type CovoiturageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conducteurId?: boolean
    depart?: boolean
    destination?: boolean
    dateDepart?: boolean
    places?: boolean
    statut?: boolean
    commentaire?: boolean
    createdAt?: boolean
    conducteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["covoiturage"]>

  export type CovoiturageSelectScalar = {
    id?: boolean
    conducteurId?: boolean
    depart?: boolean
    destination?: boolean
    dateDepart?: boolean
    places?: boolean
    statut?: boolean
    commentaire?: boolean
    createdAt?: boolean
  }

  export type CovoiturageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conducteurId" | "depart" | "destination" | "dateDepart" | "places" | "statut" | "commentaire" | "createdAt", ExtArgs["result"]["covoiturage"]>
  export type CovoiturageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conducteur?: boolean | UserDefaultArgs<ExtArgs>
    passagers?: boolean | Covoiturage$passagersArgs<ExtArgs>
    _count?: boolean | CovoiturageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CovoiturageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conducteur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CovoiturageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conducteur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CovoituragePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Covoiturage"
    objects: {
      conducteur: Prisma.$UserPayload<ExtArgs>
      passagers: Prisma.$CovoituragePassagerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conducteurId: string
      depart: string
      destination: string
      dateDepart: Date
      places: number
      statut: $Enums.StatutCovoiturage
      commentaire: string | null
      createdAt: Date
    }, ExtArgs["result"]["covoiturage"]>
    composites: {}
  }

  type CovoiturageGetPayload<S extends boolean | null | undefined | CovoiturageDefaultArgs> = $Result.GetResult<Prisma.$CovoituragePayload, S>

  type CovoiturageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CovoiturageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CovoiturageCountAggregateInputType | true
    }

  export interface CovoiturageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Covoiturage'], meta: { name: 'Covoiturage' } }
    /**
     * Find zero or one Covoiturage that matches the filter.
     * @param {CovoiturageFindUniqueArgs} args - Arguments to find a Covoiturage
     * @example
     * // Get one Covoiturage
     * const covoiturage = await prisma.covoiturage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CovoiturageFindUniqueArgs>(args: SelectSubset<T, CovoiturageFindUniqueArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Covoiturage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CovoiturageFindUniqueOrThrowArgs} args - Arguments to find a Covoiturage
     * @example
     * // Get one Covoiturage
     * const covoiturage = await prisma.covoiturage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CovoiturageFindUniqueOrThrowArgs>(args: SelectSubset<T, CovoiturageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Covoiturage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageFindFirstArgs} args - Arguments to find a Covoiturage
     * @example
     * // Get one Covoiturage
     * const covoiturage = await prisma.covoiturage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CovoiturageFindFirstArgs>(args?: SelectSubset<T, CovoiturageFindFirstArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Covoiturage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageFindFirstOrThrowArgs} args - Arguments to find a Covoiturage
     * @example
     * // Get one Covoiturage
     * const covoiturage = await prisma.covoiturage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CovoiturageFindFirstOrThrowArgs>(args?: SelectSubset<T, CovoiturageFindFirstOrThrowArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Covoiturages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Covoiturages
     * const covoiturages = await prisma.covoiturage.findMany()
     * 
     * // Get first 10 Covoiturages
     * const covoiturages = await prisma.covoiturage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const covoiturageWithIdOnly = await prisma.covoiturage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CovoiturageFindManyArgs>(args?: SelectSubset<T, CovoiturageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Covoiturage.
     * @param {CovoiturageCreateArgs} args - Arguments to create a Covoiturage.
     * @example
     * // Create one Covoiturage
     * const Covoiturage = await prisma.covoiturage.create({
     *   data: {
     *     // ... data to create a Covoiturage
     *   }
     * })
     * 
     */
    create<T extends CovoiturageCreateArgs>(args: SelectSubset<T, CovoiturageCreateArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Covoiturages.
     * @param {CovoiturageCreateManyArgs} args - Arguments to create many Covoiturages.
     * @example
     * // Create many Covoiturages
     * const covoiturage = await prisma.covoiturage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CovoiturageCreateManyArgs>(args?: SelectSubset<T, CovoiturageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Covoiturages and returns the data saved in the database.
     * @param {CovoiturageCreateManyAndReturnArgs} args - Arguments to create many Covoiturages.
     * @example
     * // Create many Covoiturages
     * const covoiturage = await prisma.covoiturage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Covoiturages and only return the `id`
     * const covoiturageWithIdOnly = await prisma.covoiturage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CovoiturageCreateManyAndReturnArgs>(args?: SelectSubset<T, CovoiturageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Covoiturage.
     * @param {CovoiturageDeleteArgs} args - Arguments to delete one Covoiturage.
     * @example
     * // Delete one Covoiturage
     * const Covoiturage = await prisma.covoiturage.delete({
     *   where: {
     *     // ... filter to delete one Covoiturage
     *   }
     * })
     * 
     */
    delete<T extends CovoiturageDeleteArgs>(args: SelectSubset<T, CovoiturageDeleteArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Covoiturage.
     * @param {CovoiturageUpdateArgs} args - Arguments to update one Covoiturage.
     * @example
     * // Update one Covoiturage
     * const covoiturage = await prisma.covoiturage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CovoiturageUpdateArgs>(args: SelectSubset<T, CovoiturageUpdateArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Covoiturages.
     * @param {CovoiturageDeleteManyArgs} args - Arguments to filter Covoiturages to delete.
     * @example
     * // Delete a few Covoiturages
     * const { count } = await prisma.covoiturage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CovoiturageDeleteManyArgs>(args?: SelectSubset<T, CovoiturageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Covoiturages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Covoiturages
     * const covoiturage = await prisma.covoiturage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CovoiturageUpdateManyArgs>(args: SelectSubset<T, CovoiturageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Covoiturages and returns the data updated in the database.
     * @param {CovoiturageUpdateManyAndReturnArgs} args - Arguments to update many Covoiturages.
     * @example
     * // Update many Covoiturages
     * const covoiturage = await prisma.covoiturage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Covoiturages and only return the `id`
     * const covoiturageWithIdOnly = await prisma.covoiturage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CovoiturageUpdateManyAndReturnArgs>(args: SelectSubset<T, CovoiturageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Covoiturage.
     * @param {CovoiturageUpsertArgs} args - Arguments to update or create a Covoiturage.
     * @example
     * // Update or create a Covoiturage
     * const covoiturage = await prisma.covoiturage.upsert({
     *   create: {
     *     // ... data to create a Covoiturage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Covoiturage we want to update
     *   }
     * })
     */
    upsert<T extends CovoiturageUpsertArgs>(args: SelectSubset<T, CovoiturageUpsertArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Covoiturages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageCountArgs} args - Arguments to filter Covoiturages to count.
     * @example
     * // Count the number of Covoiturages
     * const count = await prisma.covoiturage.count({
     *   where: {
     *     // ... the filter for the Covoiturages we want to count
     *   }
     * })
    **/
    count<T extends CovoiturageCountArgs>(
      args?: Subset<T, CovoiturageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CovoiturageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Covoiturage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CovoiturageAggregateArgs>(args: Subset<T, CovoiturageAggregateArgs>): Prisma.PrismaPromise<GetCovoiturageAggregateType<T>>

    /**
     * Group by Covoiturage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoiturageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CovoiturageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CovoiturageGroupByArgs['orderBy'] }
        : { orderBy?: CovoiturageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CovoiturageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCovoiturageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Covoiturage model
   */
  readonly fields: CovoiturageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Covoiturage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CovoiturageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conducteur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    passagers<T extends Covoiturage$passagersArgs<ExtArgs> = {}>(args?: Subset<T, Covoiturage$passagersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Covoiturage model
   */
  interface CovoiturageFieldRefs {
    readonly id: FieldRef<"Covoiturage", 'String'>
    readonly conducteurId: FieldRef<"Covoiturage", 'String'>
    readonly depart: FieldRef<"Covoiturage", 'String'>
    readonly destination: FieldRef<"Covoiturage", 'String'>
    readonly dateDepart: FieldRef<"Covoiturage", 'DateTime'>
    readonly places: FieldRef<"Covoiturage", 'Int'>
    readonly statut: FieldRef<"Covoiturage", 'StatutCovoiturage'>
    readonly commentaire: FieldRef<"Covoiturage", 'String'>
    readonly createdAt: FieldRef<"Covoiturage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Covoiturage findUnique
   */
  export type CovoiturageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * Filter, which Covoiturage to fetch.
     */
    where: CovoiturageWhereUniqueInput
  }

  /**
   * Covoiturage findUniqueOrThrow
   */
  export type CovoiturageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * Filter, which Covoiturage to fetch.
     */
    where: CovoiturageWhereUniqueInput
  }

  /**
   * Covoiturage findFirst
   */
  export type CovoiturageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * Filter, which Covoiturage to fetch.
     */
    where?: CovoiturageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Covoiturages to fetch.
     */
    orderBy?: CovoiturageOrderByWithRelationInput | CovoiturageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Covoiturages.
     */
    cursor?: CovoiturageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Covoiturages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Covoiturages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Covoiturages.
     */
    distinct?: CovoiturageScalarFieldEnum | CovoiturageScalarFieldEnum[]
  }

  /**
   * Covoiturage findFirstOrThrow
   */
  export type CovoiturageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * Filter, which Covoiturage to fetch.
     */
    where?: CovoiturageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Covoiturages to fetch.
     */
    orderBy?: CovoiturageOrderByWithRelationInput | CovoiturageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Covoiturages.
     */
    cursor?: CovoiturageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Covoiturages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Covoiturages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Covoiturages.
     */
    distinct?: CovoiturageScalarFieldEnum | CovoiturageScalarFieldEnum[]
  }

  /**
   * Covoiturage findMany
   */
  export type CovoiturageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * Filter, which Covoiturages to fetch.
     */
    where?: CovoiturageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Covoiturages to fetch.
     */
    orderBy?: CovoiturageOrderByWithRelationInput | CovoiturageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Covoiturages.
     */
    cursor?: CovoiturageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Covoiturages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Covoiturages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Covoiturages.
     */
    distinct?: CovoiturageScalarFieldEnum | CovoiturageScalarFieldEnum[]
  }

  /**
   * Covoiturage create
   */
  export type CovoiturageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * The data needed to create a Covoiturage.
     */
    data: XOR<CovoiturageCreateInput, CovoiturageUncheckedCreateInput>
  }

  /**
   * Covoiturage createMany
   */
  export type CovoiturageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Covoiturages.
     */
    data: CovoiturageCreateManyInput | CovoiturageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Covoiturage createManyAndReturn
   */
  export type CovoiturageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * The data used to create many Covoiturages.
     */
    data: CovoiturageCreateManyInput | CovoiturageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Covoiturage update
   */
  export type CovoiturageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * The data needed to update a Covoiturage.
     */
    data: XOR<CovoiturageUpdateInput, CovoiturageUncheckedUpdateInput>
    /**
     * Choose, which Covoiturage to update.
     */
    where: CovoiturageWhereUniqueInput
  }

  /**
   * Covoiturage updateMany
   */
  export type CovoiturageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Covoiturages.
     */
    data: XOR<CovoiturageUpdateManyMutationInput, CovoiturageUncheckedUpdateManyInput>
    /**
     * Filter which Covoiturages to update
     */
    where?: CovoiturageWhereInput
    /**
     * Limit how many Covoiturages to update.
     */
    limit?: number
  }

  /**
   * Covoiturage updateManyAndReturn
   */
  export type CovoiturageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * The data used to update Covoiturages.
     */
    data: XOR<CovoiturageUpdateManyMutationInput, CovoiturageUncheckedUpdateManyInput>
    /**
     * Filter which Covoiturages to update
     */
    where?: CovoiturageWhereInput
    /**
     * Limit how many Covoiturages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Covoiturage upsert
   */
  export type CovoiturageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * The filter to search for the Covoiturage to update in case it exists.
     */
    where: CovoiturageWhereUniqueInput
    /**
     * In case the Covoiturage found by the `where` argument doesn't exist, create a new Covoiturage with this data.
     */
    create: XOR<CovoiturageCreateInput, CovoiturageUncheckedCreateInput>
    /**
     * In case the Covoiturage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CovoiturageUpdateInput, CovoiturageUncheckedUpdateInput>
  }

  /**
   * Covoiturage delete
   */
  export type CovoiturageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
    /**
     * Filter which Covoiturage to delete.
     */
    where: CovoiturageWhereUniqueInput
  }

  /**
   * Covoiturage deleteMany
   */
  export type CovoiturageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Covoiturages to delete
     */
    where?: CovoiturageWhereInput
    /**
     * Limit how many Covoiturages to delete.
     */
    limit?: number
  }

  /**
   * Covoiturage.passagers
   */
  export type Covoiturage$passagersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    where?: CovoituragePassagerWhereInput
    orderBy?: CovoituragePassagerOrderByWithRelationInput | CovoituragePassagerOrderByWithRelationInput[]
    cursor?: CovoituragePassagerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CovoituragePassagerScalarFieldEnum | CovoituragePassagerScalarFieldEnum[]
  }

  /**
   * Covoiturage without action
   */
  export type CovoiturageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Covoiturage
     */
    select?: CovoiturageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Covoiturage
     */
    omit?: CovoiturageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoiturageInclude<ExtArgs> | null
  }


  /**
   * Model CovoituragePassager
   */

  export type AggregateCovoituragePassager = {
    _count: CovoituragePassagerCountAggregateOutputType | null
    _min: CovoituragePassagerMinAggregateOutputType | null
    _max: CovoituragePassagerMaxAggregateOutputType | null
  }

  export type CovoituragePassagerMinAggregateOutputType = {
    id: string | null
    covoiturageId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type CovoituragePassagerMaxAggregateOutputType = {
    id: string | null
    covoiturageId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type CovoituragePassagerCountAggregateOutputType = {
    id: number
    covoiturageId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type CovoituragePassagerMinAggregateInputType = {
    id?: true
    covoiturageId?: true
    userId?: true
    createdAt?: true
  }

  export type CovoituragePassagerMaxAggregateInputType = {
    id?: true
    covoiturageId?: true
    userId?: true
    createdAt?: true
  }

  export type CovoituragePassagerCountAggregateInputType = {
    id?: true
    covoiturageId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type CovoituragePassagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CovoituragePassager to aggregate.
     */
    where?: CovoituragePassagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CovoituragePassagers to fetch.
     */
    orderBy?: CovoituragePassagerOrderByWithRelationInput | CovoituragePassagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CovoituragePassagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CovoituragePassagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CovoituragePassagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CovoituragePassagers
    **/
    _count?: true | CovoituragePassagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CovoituragePassagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CovoituragePassagerMaxAggregateInputType
  }

  export type GetCovoituragePassagerAggregateType<T extends CovoituragePassagerAggregateArgs> = {
        [P in keyof T & keyof AggregateCovoituragePassager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCovoituragePassager[P]>
      : GetScalarType<T[P], AggregateCovoituragePassager[P]>
  }




  export type CovoituragePassagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CovoituragePassagerWhereInput
    orderBy?: CovoituragePassagerOrderByWithAggregationInput | CovoituragePassagerOrderByWithAggregationInput[]
    by: CovoituragePassagerScalarFieldEnum[] | CovoituragePassagerScalarFieldEnum
    having?: CovoituragePassagerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CovoituragePassagerCountAggregateInputType | true
    _min?: CovoituragePassagerMinAggregateInputType
    _max?: CovoituragePassagerMaxAggregateInputType
  }

  export type CovoituragePassagerGroupByOutputType = {
    id: string
    covoiturageId: string
    userId: string
    createdAt: Date
    _count: CovoituragePassagerCountAggregateOutputType | null
    _min: CovoituragePassagerMinAggregateOutputType | null
    _max: CovoituragePassagerMaxAggregateOutputType | null
  }

  type GetCovoituragePassagerGroupByPayload<T extends CovoituragePassagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CovoituragePassagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CovoituragePassagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CovoituragePassagerGroupByOutputType[P]>
            : GetScalarType<T[P], CovoituragePassagerGroupByOutputType[P]>
        }
      >
    >


  export type CovoituragePassagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    covoiturageId?: boolean
    userId?: boolean
    createdAt?: boolean
    covoiturage?: boolean | CovoiturageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["covoituragePassager"]>

  export type CovoituragePassagerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    covoiturageId?: boolean
    userId?: boolean
    createdAt?: boolean
    covoiturage?: boolean | CovoiturageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["covoituragePassager"]>

  export type CovoituragePassagerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    covoiturageId?: boolean
    userId?: boolean
    createdAt?: boolean
    covoiturage?: boolean | CovoiturageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["covoituragePassager"]>

  export type CovoituragePassagerSelectScalar = {
    id?: boolean
    covoiturageId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type CovoituragePassagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "covoiturageId" | "userId" | "createdAt", ExtArgs["result"]["covoituragePassager"]>
  export type CovoituragePassagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    covoiturage?: boolean | CovoiturageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CovoituragePassagerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    covoiturage?: boolean | CovoiturageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CovoituragePassagerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    covoiturage?: boolean | CovoiturageDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CovoituragePassagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CovoituragePassager"
    objects: {
      covoiturage: Prisma.$CovoituragePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      covoiturageId: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["covoituragePassager"]>
    composites: {}
  }

  type CovoituragePassagerGetPayload<S extends boolean | null | undefined | CovoituragePassagerDefaultArgs> = $Result.GetResult<Prisma.$CovoituragePassagerPayload, S>

  type CovoituragePassagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CovoituragePassagerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CovoituragePassagerCountAggregateInputType | true
    }

  export interface CovoituragePassagerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CovoituragePassager'], meta: { name: 'CovoituragePassager' } }
    /**
     * Find zero or one CovoituragePassager that matches the filter.
     * @param {CovoituragePassagerFindUniqueArgs} args - Arguments to find a CovoituragePassager
     * @example
     * // Get one CovoituragePassager
     * const covoituragePassager = await prisma.covoituragePassager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CovoituragePassagerFindUniqueArgs>(args: SelectSubset<T, CovoituragePassagerFindUniqueArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CovoituragePassager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CovoituragePassagerFindUniqueOrThrowArgs} args - Arguments to find a CovoituragePassager
     * @example
     * // Get one CovoituragePassager
     * const covoituragePassager = await prisma.covoituragePassager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CovoituragePassagerFindUniqueOrThrowArgs>(args: SelectSubset<T, CovoituragePassagerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CovoituragePassager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerFindFirstArgs} args - Arguments to find a CovoituragePassager
     * @example
     * // Get one CovoituragePassager
     * const covoituragePassager = await prisma.covoituragePassager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CovoituragePassagerFindFirstArgs>(args?: SelectSubset<T, CovoituragePassagerFindFirstArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CovoituragePassager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerFindFirstOrThrowArgs} args - Arguments to find a CovoituragePassager
     * @example
     * // Get one CovoituragePassager
     * const covoituragePassager = await prisma.covoituragePassager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CovoituragePassagerFindFirstOrThrowArgs>(args?: SelectSubset<T, CovoituragePassagerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CovoituragePassagers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CovoituragePassagers
     * const covoituragePassagers = await prisma.covoituragePassager.findMany()
     * 
     * // Get first 10 CovoituragePassagers
     * const covoituragePassagers = await prisma.covoituragePassager.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const covoituragePassagerWithIdOnly = await prisma.covoituragePassager.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CovoituragePassagerFindManyArgs>(args?: SelectSubset<T, CovoituragePassagerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CovoituragePassager.
     * @param {CovoituragePassagerCreateArgs} args - Arguments to create a CovoituragePassager.
     * @example
     * // Create one CovoituragePassager
     * const CovoituragePassager = await prisma.covoituragePassager.create({
     *   data: {
     *     // ... data to create a CovoituragePassager
     *   }
     * })
     * 
     */
    create<T extends CovoituragePassagerCreateArgs>(args: SelectSubset<T, CovoituragePassagerCreateArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CovoituragePassagers.
     * @param {CovoituragePassagerCreateManyArgs} args - Arguments to create many CovoituragePassagers.
     * @example
     * // Create many CovoituragePassagers
     * const covoituragePassager = await prisma.covoituragePassager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CovoituragePassagerCreateManyArgs>(args?: SelectSubset<T, CovoituragePassagerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CovoituragePassagers and returns the data saved in the database.
     * @param {CovoituragePassagerCreateManyAndReturnArgs} args - Arguments to create many CovoituragePassagers.
     * @example
     * // Create many CovoituragePassagers
     * const covoituragePassager = await prisma.covoituragePassager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CovoituragePassagers and only return the `id`
     * const covoituragePassagerWithIdOnly = await prisma.covoituragePassager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CovoituragePassagerCreateManyAndReturnArgs>(args?: SelectSubset<T, CovoituragePassagerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CovoituragePassager.
     * @param {CovoituragePassagerDeleteArgs} args - Arguments to delete one CovoituragePassager.
     * @example
     * // Delete one CovoituragePassager
     * const CovoituragePassager = await prisma.covoituragePassager.delete({
     *   where: {
     *     // ... filter to delete one CovoituragePassager
     *   }
     * })
     * 
     */
    delete<T extends CovoituragePassagerDeleteArgs>(args: SelectSubset<T, CovoituragePassagerDeleteArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CovoituragePassager.
     * @param {CovoituragePassagerUpdateArgs} args - Arguments to update one CovoituragePassager.
     * @example
     * // Update one CovoituragePassager
     * const covoituragePassager = await prisma.covoituragePassager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CovoituragePassagerUpdateArgs>(args: SelectSubset<T, CovoituragePassagerUpdateArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CovoituragePassagers.
     * @param {CovoituragePassagerDeleteManyArgs} args - Arguments to filter CovoituragePassagers to delete.
     * @example
     * // Delete a few CovoituragePassagers
     * const { count } = await prisma.covoituragePassager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CovoituragePassagerDeleteManyArgs>(args?: SelectSubset<T, CovoituragePassagerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CovoituragePassagers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CovoituragePassagers
     * const covoituragePassager = await prisma.covoituragePassager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CovoituragePassagerUpdateManyArgs>(args: SelectSubset<T, CovoituragePassagerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CovoituragePassagers and returns the data updated in the database.
     * @param {CovoituragePassagerUpdateManyAndReturnArgs} args - Arguments to update many CovoituragePassagers.
     * @example
     * // Update many CovoituragePassagers
     * const covoituragePassager = await prisma.covoituragePassager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CovoituragePassagers and only return the `id`
     * const covoituragePassagerWithIdOnly = await prisma.covoituragePassager.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CovoituragePassagerUpdateManyAndReturnArgs>(args: SelectSubset<T, CovoituragePassagerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CovoituragePassager.
     * @param {CovoituragePassagerUpsertArgs} args - Arguments to update or create a CovoituragePassager.
     * @example
     * // Update or create a CovoituragePassager
     * const covoituragePassager = await prisma.covoituragePassager.upsert({
     *   create: {
     *     // ... data to create a CovoituragePassager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CovoituragePassager we want to update
     *   }
     * })
     */
    upsert<T extends CovoituragePassagerUpsertArgs>(args: SelectSubset<T, CovoituragePassagerUpsertArgs<ExtArgs>>): Prisma__CovoituragePassagerClient<$Result.GetResult<Prisma.$CovoituragePassagerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CovoituragePassagers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerCountArgs} args - Arguments to filter CovoituragePassagers to count.
     * @example
     * // Count the number of CovoituragePassagers
     * const count = await prisma.covoituragePassager.count({
     *   where: {
     *     // ... the filter for the CovoituragePassagers we want to count
     *   }
     * })
    **/
    count<T extends CovoituragePassagerCountArgs>(
      args?: Subset<T, CovoituragePassagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CovoituragePassagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CovoituragePassager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CovoituragePassagerAggregateArgs>(args: Subset<T, CovoituragePassagerAggregateArgs>): Prisma.PrismaPromise<GetCovoituragePassagerAggregateType<T>>

    /**
     * Group by CovoituragePassager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CovoituragePassagerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CovoituragePassagerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CovoituragePassagerGroupByArgs['orderBy'] }
        : { orderBy?: CovoituragePassagerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CovoituragePassagerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCovoituragePassagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CovoituragePassager model
   */
  readonly fields: CovoituragePassagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CovoituragePassager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CovoituragePassagerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    covoiturage<T extends CovoiturageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CovoiturageDefaultArgs<ExtArgs>>): Prisma__CovoiturageClient<$Result.GetResult<Prisma.$CovoituragePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CovoituragePassager model
   */
  interface CovoituragePassagerFieldRefs {
    readonly id: FieldRef<"CovoituragePassager", 'String'>
    readonly covoiturageId: FieldRef<"CovoituragePassager", 'String'>
    readonly userId: FieldRef<"CovoituragePassager", 'String'>
    readonly createdAt: FieldRef<"CovoituragePassager", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CovoituragePassager findUnique
   */
  export type CovoituragePassagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * Filter, which CovoituragePassager to fetch.
     */
    where: CovoituragePassagerWhereUniqueInput
  }

  /**
   * CovoituragePassager findUniqueOrThrow
   */
  export type CovoituragePassagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * Filter, which CovoituragePassager to fetch.
     */
    where: CovoituragePassagerWhereUniqueInput
  }

  /**
   * CovoituragePassager findFirst
   */
  export type CovoituragePassagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * Filter, which CovoituragePassager to fetch.
     */
    where?: CovoituragePassagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CovoituragePassagers to fetch.
     */
    orderBy?: CovoituragePassagerOrderByWithRelationInput | CovoituragePassagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CovoituragePassagers.
     */
    cursor?: CovoituragePassagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CovoituragePassagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CovoituragePassagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CovoituragePassagers.
     */
    distinct?: CovoituragePassagerScalarFieldEnum | CovoituragePassagerScalarFieldEnum[]
  }

  /**
   * CovoituragePassager findFirstOrThrow
   */
  export type CovoituragePassagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * Filter, which CovoituragePassager to fetch.
     */
    where?: CovoituragePassagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CovoituragePassagers to fetch.
     */
    orderBy?: CovoituragePassagerOrderByWithRelationInput | CovoituragePassagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CovoituragePassagers.
     */
    cursor?: CovoituragePassagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CovoituragePassagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CovoituragePassagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CovoituragePassagers.
     */
    distinct?: CovoituragePassagerScalarFieldEnum | CovoituragePassagerScalarFieldEnum[]
  }

  /**
   * CovoituragePassager findMany
   */
  export type CovoituragePassagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * Filter, which CovoituragePassagers to fetch.
     */
    where?: CovoituragePassagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CovoituragePassagers to fetch.
     */
    orderBy?: CovoituragePassagerOrderByWithRelationInput | CovoituragePassagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CovoituragePassagers.
     */
    cursor?: CovoituragePassagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CovoituragePassagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CovoituragePassagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CovoituragePassagers.
     */
    distinct?: CovoituragePassagerScalarFieldEnum | CovoituragePassagerScalarFieldEnum[]
  }

  /**
   * CovoituragePassager create
   */
  export type CovoituragePassagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * The data needed to create a CovoituragePassager.
     */
    data: XOR<CovoituragePassagerCreateInput, CovoituragePassagerUncheckedCreateInput>
  }

  /**
   * CovoituragePassager createMany
   */
  export type CovoituragePassagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CovoituragePassagers.
     */
    data: CovoituragePassagerCreateManyInput | CovoituragePassagerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CovoituragePassager createManyAndReturn
   */
  export type CovoituragePassagerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * The data used to create many CovoituragePassagers.
     */
    data: CovoituragePassagerCreateManyInput | CovoituragePassagerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CovoituragePassager update
   */
  export type CovoituragePassagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * The data needed to update a CovoituragePassager.
     */
    data: XOR<CovoituragePassagerUpdateInput, CovoituragePassagerUncheckedUpdateInput>
    /**
     * Choose, which CovoituragePassager to update.
     */
    where: CovoituragePassagerWhereUniqueInput
  }

  /**
   * CovoituragePassager updateMany
   */
  export type CovoituragePassagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CovoituragePassagers.
     */
    data: XOR<CovoituragePassagerUpdateManyMutationInput, CovoituragePassagerUncheckedUpdateManyInput>
    /**
     * Filter which CovoituragePassagers to update
     */
    where?: CovoituragePassagerWhereInput
    /**
     * Limit how many CovoituragePassagers to update.
     */
    limit?: number
  }

  /**
   * CovoituragePassager updateManyAndReturn
   */
  export type CovoituragePassagerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * The data used to update CovoituragePassagers.
     */
    data: XOR<CovoituragePassagerUpdateManyMutationInput, CovoituragePassagerUncheckedUpdateManyInput>
    /**
     * Filter which CovoituragePassagers to update
     */
    where?: CovoituragePassagerWhereInput
    /**
     * Limit how many CovoituragePassagers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CovoituragePassager upsert
   */
  export type CovoituragePassagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * The filter to search for the CovoituragePassager to update in case it exists.
     */
    where: CovoituragePassagerWhereUniqueInput
    /**
     * In case the CovoituragePassager found by the `where` argument doesn't exist, create a new CovoituragePassager with this data.
     */
    create: XOR<CovoituragePassagerCreateInput, CovoituragePassagerUncheckedCreateInput>
    /**
     * In case the CovoituragePassager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CovoituragePassagerUpdateInput, CovoituragePassagerUncheckedUpdateInput>
  }

  /**
   * CovoituragePassager delete
   */
  export type CovoituragePassagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
    /**
     * Filter which CovoituragePassager to delete.
     */
    where: CovoituragePassagerWhereUniqueInput
  }

  /**
   * CovoituragePassager deleteMany
   */
  export type CovoituragePassagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CovoituragePassagers to delete
     */
    where?: CovoituragePassagerWhereInput
    /**
     * Limit how many CovoituragePassagers to delete.
     */
    limit?: number
  }

  /**
   * CovoituragePassager without action
   */
  export type CovoituragePassagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CovoituragePassager
     */
    select?: CovoituragePassagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CovoituragePassager
     */
    omit?: CovoituragePassagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CovoituragePassagerInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    titre: string | null
    contenu: string | null
    publie: boolean | null
    auteurId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    titre: string | null
    contenu: string | null
    publie: boolean | null
    auteurId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    titre: number
    contenu: number
    publie: number
    auteurId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    titre?: true
    contenu?: true
    publie?: true
    auteurId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    titre?: true
    contenu?: true
    publie?: true
    auteurId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    titre?: true
    contenu?: true
    publie?: true
    auteurId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    titre: string
    contenu: string
    publie: boolean
    auteurId: string
    createdAt: Date
    updatedAt: Date
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    contenu?: boolean
    publie?: boolean
    auteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    contenu?: boolean
    publie?: boolean
    auteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titre?: boolean
    contenu?: boolean
    publie?: boolean
    auteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    titre?: boolean
    contenu?: boolean
    publie?: boolean
    auteurId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titre" | "contenu" | "publie" | "auteurId" | "createdAt" | "updatedAt", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auteur?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      auteur: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titre: string
      contenu: string
      publie: boolean
      auteurId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auteur<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly titre: FieldRef<"Article", 'String'>
    readonly contenu: FieldRef<"Article", 'String'>
    readonly publie: FieldRef<"Article", 'Boolean'>
    readonly auteurId: FieldRef<"Article", 'String'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    nom: 'nom',
    prenom: 'prenom',
    telephone: 'telephone',
    password: 'password',
    role: 'role',
    actif: 'actif',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FormationScalarFieldEnum: {
    id: 'id',
    titre: 'titre',
    description: 'description',
    type: 'type',
    statut: 'statut',
    dureeHeures: 'dureeHeures',
    prix: 'prix',
    places: 'places',
    lienVisio: 'lienVisio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FormationScalarFieldEnum = (typeof FormationScalarFieldEnum)[keyof typeof FormationScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    formationId: 'formationId',
    dateDebut: 'dateDebut',
    dateFin: 'dateFin',
    lieu: 'lieu',
    lienVisio: 'lienVisio',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const InscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    formationId: 'formationId',
    statut: 'statut',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InscriptionScalarFieldEnum = (typeof InscriptionScalarFieldEnum)[keyof typeof InscriptionScalarFieldEnum]


  export const DemandeInscriptionScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    email: 'email',
    telephone: 'telephone',
    message: 'message',
    formationId: 'formationId',
    userId: 'userId',
    statut: 'statut',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DemandeInscriptionScalarFieldEnum = (typeof DemandeInscriptionScalarFieldEnum)[keyof typeof DemandeInscriptionScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    url: 'url',
    taille: 'taille',
    mimeType: 'mimeType',
    uploaderId: 'uploaderId',
    formationId: 'formationId',
    public: 'public',
    createdAt: 'createdAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const SignatureScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    userId: 'userId',
    signedAt: 'signedAt',
    signatureUrl: 'signatureUrl'
  };

  export type SignatureScalarFieldEnum = (typeof SignatureScalarFieldEnum)[keyof typeof SignatureScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    expediteurId: 'expediteurId',
    sujet: 'sujet',
    contenu: 'contenu',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const MessageDestinataireScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    userId: 'userId',
    lu: 'lu',
    luAt: 'luAt'
  };

  export type MessageDestinataireScalarFieldEnum = (typeof MessageDestinataireScalarFieldEnum)[keyof typeof MessageDestinataireScalarFieldEnum]


  export const CovoiturageScalarFieldEnum: {
    id: 'id',
    conducteurId: 'conducteurId',
    depart: 'depart',
    destination: 'destination',
    dateDepart: 'dateDepart',
    places: 'places',
    statut: 'statut',
    commentaire: 'commentaire',
    createdAt: 'createdAt'
  };

  export type CovoiturageScalarFieldEnum = (typeof CovoiturageScalarFieldEnum)[keyof typeof CovoiturageScalarFieldEnum]


  export const CovoituragePassagerScalarFieldEnum: {
    id: 'id',
    covoiturageId: 'covoiturageId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type CovoituragePassagerScalarFieldEnum = (typeof CovoituragePassagerScalarFieldEnum)[keyof typeof CovoituragePassagerScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    titre: 'titre',
    contenu: 'contenu',
    publie: 'publie',
    auteurId: 'auteurId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TypeFormation'
   */
  export type EnumTypeFormationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeFormation'>
    


  /**
   * Reference to a field of type 'TypeFormation[]'
   */
  export type ListEnumTypeFormationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TypeFormation[]'>
    


  /**
   * Reference to a field of type 'StatutFormation'
   */
  export type EnumStatutFormationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutFormation'>
    


  /**
   * Reference to a field of type 'StatutFormation[]'
   */
  export type ListEnumStatutFormationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutFormation[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StatutInscription'
   */
  export type EnumStatutInscriptionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutInscription'>
    


  /**
   * Reference to a field of type 'StatutInscription[]'
   */
  export type ListEnumStatutInscriptionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutInscription[]'>
    


  /**
   * Reference to a field of type 'StatutCovoiturage'
   */
  export type EnumStatutCovoiturageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutCovoiturage'>
    


  /**
   * Reference to a field of type 'StatutCovoiturage[]'
   */
  export type ListEnumStatutCovoiturageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutCovoiturage[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    telephone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    actif?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    documentsUpload?: DocumentListRelationFilter
    signatures?: SignatureListRelationFilter
    messagesEnvoyes?: MessageListRelationFilter
    messagesRecus?: MessageDestinataireListRelationFilter
    covoituragesConduit?: CovoiturageListRelationFilter
    covoituragesPassager?: CovoituragePassagerListRelationFilter
    articles?: ArticleListRelationFilter
    demandesInscription?: DemandeInscriptionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscriptions?: InscriptionOrderByRelationAggregateInput
    documentsUpload?: DocumentOrderByRelationAggregateInput
    signatures?: SignatureOrderByRelationAggregateInput
    messagesEnvoyes?: MessageOrderByRelationAggregateInput
    messagesRecus?: MessageDestinataireOrderByRelationAggregateInput
    covoituragesConduit?: CovoiturageOrderByRelationAggregateInput
    covoituragesPassager?: CovoituragePassagerOrderByRelationAggregateInput
    articles?: ArticleOrderByRelationAggregateInput
    demandesInscription?: DemandeInscriptionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nom?: StringFilter<"User"> | string
    prenom?: StringFilter<"User"> | string
    telephone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    actif?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    inscriptions?: InscriptionListRelationFilter
    documentsUpload?: DocumentListRelationFilter
    signatures?: SignatureListRelationFilter
    messagesEnvoyes?: MessageListRelationFilter
    messagesRecus?: MessageDestinataireListRelationFilter
    covoituragesConduit?: CovoiturageListRelationFilter
    covoituragesPassager?: CovoituragePassagerListRelationFilter
    articles?: ArticleListRelationFilter
    demandesInscription?: DemandeInscriptionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    nom?: StringWithAggregatesFilter<"User"> | string
    prenom?: StringWithAggregatesFilter<"User"> | string
    telephone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    actif?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FormationWhereInput = {
    AND?: FormationWhereInput | FormationWhereInput[]
    OR?: FormationWhereInput[]
    NOT?: FormationWhereInput | FormationWhereInput[]
    id?: StringFilter<"Formation"> | string
    titre?: StringFilter<"Formation"> | string
    description?: StringNullableFilter<"Formation"> | string | null
    type?: EnumTypeFormationFilter<"Formation"> | $Enums.TypeFormation
    statut?: EnumStatutFormationFilter<"Formation"> | $Enums.StatutFormation
    dureeHeures?: IntNullableFilter<"Formation"> | number | null
    prix?: FloatNullableFilter<"Formation"> | number | null
    places?: IntNullableFilter<"Formation"> | number | null
    lienVisio?: StringNullableFilter<"Formation"> | string | null
    createdAt?: DateTimeFilter<"Formation"> | Date | string
    updatedAt?: DateTimeFilter<"Formation"> | Date | string
    sessions?: SessionListRelationFilter
    inscriptions?: InscriptionListRelationFilter
    demandes?: DemandeInscriptionListRelationFilter
    documents?: DocumentListRelationFilter
  }

  export type FormationOrderByWithRelationInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    statut?: SortOrder
    dureeHeures?: SortOrderInput | SortOrder
    prix?: SortOrderInput | SortOrder
    places?: SortOrderInput | SortOrder
    lienVisio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    inscriptions?: InscriptionOrderByRelationAggregateInput
    demandes?: DemandeInscriptionOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type FormationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FormationWhereInput | FormationWhereInput[]
    OR?: FormationWhereInput[]
    NOT?: FormationWhereInput | FormationWhereInput[]
    titre?: StringFilter<"Formation"> | string
    description?: StringNullableFilter<"Formation"> | string | null
    type?: EnumTypeFormationFilter<"Formation"> | $Enums.TypeFormation
    statut?: EnumStatutFormationFilter<"Formation"> | $Enums.StatutFormation
    dureeHeures?: IntNullableFilter<"Formation"> | number | null
    prix?: FloatNullableFilter<"Formation"> | number | null
    places?: IntNullableFilter<"Formation"> | number | null
    lienVisio?: StringNullableFilter<"Formation"> | string | null
    createdAt?: DateTimeFilter<"Formation"> | Date | string
    updatedAt?: DateTimeFilter<"Formation"> | Date | string
    sessions?: SessionListRelationFilter
    inscriptions?: InscriptionListRelationFilter
    demandes?: DemandeInscriptionListRelationFilter
    documents?: DocumentListRelationFilter
  }, "id">

  export type FormationOrderByWithAggregationInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    statut?: SortOrder
    dureeHeures?: SortOrderInput | SortOrder
    prix?: SortOrderInput | SortOrder
    places?: SortOrderInput | SortOrder
    lienVisio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FormationCountOrderByAggregateInput
    _avg?: FormationAvgOrderByAggregateInput
    _max?: FormationMaxOrderByAggregateInput
    _min?: FormationMinOrderByAggregateInput
    _sum?: FormationSumOrderByAggregateInput
  }

  export type FormationScalarWhereWithAggregatesInput = {
    AND?: FormationScalarWhereWithAggregatesInput | FormationScalarWhereWithAggregatesInput[]
    OR?: FormationScalarWhereWithAggregatesInput[]
    NOT?: FormationScalarWhereWithAggregatesInput | FormationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Formation"> | string
    titre?: StringWithAggregatesFilter<"Formation"> | string
    description?: StringNullableWithAggregatesFilter<"Formation"> | string | null
    type?: EnumTypeFormationWithAggregatesFilter<"Formation"> | $Enums.TypeFormation
    statut?: EnumStatutFormationWithAggregatesFilter<"Formation"> | $Enums.StatutFormation
    dureeHeures?: IntNullableWithAggregatesFilter<"Formation"> | number | null
    prix?: FloatNullableWithAggregatesFilter<"Formation"> | number | null
    places?: IntNullableWithAggregatesFilter<"Formation"> | number | null
    lienVisio?: StringNullableWithAggregatesFilter<"Formation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Formation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Formation"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    formationId?: StringFilter<"Session"> | string
    dateDebut?: DateTimeFilter<"Session"> | Date | string
    dateFin?: DateTimeFilter<"Session"> | Date | string
    lieu?: StringNullableFilter<"Session"> | string | null
    lienVisio?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    formationId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    lieu?: SortOrderInput | SortOrder
    lienVisio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    formation?: FormationOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    formationId?: StringFilter<"Session"> | string
    dateDebut?: DateTimeFilter<"Session"> | Date | string
    dateFin?: DateTimeFilter<"Session"> | Date | string
    lieu?: StringNullableFilter<"Session"> | string | null
    lienVisio?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    formationId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    lieu?: SortOrderInput | SortOrder
    lienVisio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    formationId?: StringWithAggregatesFilter<"Session"> | string
    dateDebut?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    dateFin?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    lieu?: StringNullableWithAggregatesFilter<"Session"> | string | null
    lienVisio?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type InscriptionWhereInput = {
    AND?: InscriptionWhereInput | InscriptionWhereInput[]
    OR?: InscriptionWhereInput[]
    NOT?: InscriptionWhereInput | InscriptionWhereInput[]
    id?: StringFilter<"Inscription"> | string
    userId?: StringFilter<"Inscription"> | string
    formationId?: StringFilter<"Inscription"> | string
    statut?: EnumStatutInscriptionFilter<"Inscription"> | $Enums.StatutInscription
    createdAt?: DateTimeFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeFilter<"Inscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
  }

  export type InscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    formationId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    formation?: FormationOrderByWithRelationInput
  }

  export type InscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_formationId?: InscriptionUserIdFormationIdCompoundUniqueInput
    AND?: InscriptionWhereInput | InscriptionWhereInput[]
    OR?: InscriptionWhereInput[]
    NOT?: InscriptionWhereInput | InscriptionWhereInput[]
    userId?: StringFilter<"Inscription"> | string
    formationId?: StringFilter<"Inscription"> | string
    statut?: EnumStatutInscriptionFilter<"Inscription"> | $Enums.StatutInscription
    createdAt?: DateTimeFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeFilter<"Inscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    formation?: XOR<FormationScalarRelationFilter, FormationWhereInput>
  }, "id" | "userId_formationId">

  export type InscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    formationId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InscriptionCountOrderByAggregateInput
    _max?: InscriptionMaxOrderByAggregateInput
    _min?: InscriptionMinOrderByAggregateInput
  }

  export type InscriptionScalarWhereWithAggregatesInput = {
    AND?: InscriptionScalarWhereWithAggregatesInput | InscriptionScalarWhereWithAggregatesInput[]
    OR?: InscriptionScalarWhereWithAggregatesInput[]
    NOT?: InscriptionScalarWhereWithAggregatesInput | InscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inscription"> | string
    userId?: StringWithAggregatesFilter<"Inscription"> | string
    formationId?: StringWithAggregatesFilter<"Inscription"> | string
    statut?: EnumStatutInscriptionWithAggregatesFilter<"Inscription"> | $Enums.StatutInscription
    createdAt?: DateTimeWithAggregatesFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Inscription"> | Date | string
  }

  export type DemandeInscriptionWhereInput = {
    AND?: DemandeInscriptionWhereInput | DemandeInscriptionWhereInput[]
    OR?: DemandeInscriptionWhereInput[]
    NOT?: DemandeInscriptionWhereInput | DemandeInscriptionWhereInput[]
    id?: StringFilter<"DemandeInscription"> | string
    nom?: StringFilter<"DemandeInscription"> | string
    prenom?: StringFilter<"DemandeInscription"> | string
    email?: StringFilter<"DemandeInscription"> | string
    telephone?: StringNullableFilter<"DemandeInscription"> | string | null
    message?: StringNullableFilter<"DemandeInscription"> | string | null
    formationId?: StringNullableFilter<"DemandeInscription"> | string | null
    userId?: StringNullableFilter<"DemandeInscription"> | string | null
    statut?: EnumStatutInscriptionFilter<"DemandeInscription"> | $Enums.StatutInscription
    createdAt?: DateTimeFilter<"DemandeInscription"> | Date | string
    updatedAt?: DateTimeFilter<"DemandeInscription"> | Date | string
    formation?: XOR<FormationNullableScalarRelationFilter, FormationWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type DemandeInscriptionOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    formationId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    formation?: FormationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type DemandeInscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DemandeInscriptionWhereInput | DemandeInscriptionWhereInput[]
    OR?: DemandeInscriptionWhereInput[]
    NOT?: DemandeInscriptionWhereInput | DemandeInscriptionWhereInput[]
    nom?: StringFilter<"DemandeInscription"> | string
    prenom?: StringFilter<"DemandeInscription"> | string
    email?: StringFilter<"DemandeInscription"> | string
    telephone?: StringNullableFilter<"DemandeInscription"> | string | null
    message?: StringNullableFilter<"DemandeInscription"> | string | null
    formationId?: StringNullableFilter<"DemandeInscription"> | string | null
    userId?: StringNullableFilter<"DemandeInscription"> | string | null
    statut?: EnumStatutInscriptionFilter<"DemandeInscription"> | $Enums.StatutInscription
    createdAt?: DateTimeFilter<"DemandeInscription"> | Date | string
    updatedAt?: DateTimeFilter<"DemandeInscription"> | Date | string
    formation?: XOR<FormationNullableScalarRelationFilter, FormationWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type DemandeInscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    formationId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DemandeInscriptionCountOrderByAggregateInput
    _max?: DemandeInscriptionMaxOrderByAggregateInput
    _min?: DemandeInscriptionMinOrderByAggregateInput
  }

  export type DemandeInscriptionScalarWhereWithAggregatesInput = {
    AND?: DemandeInscriptionScalarWhereWithAggregatesInput | DemandeInscriptionScalarWhereWithAggregatesInput[]
    OR?: DemandeInscriptionScalarWhereWithAggregatesInput[]
    NOT?: DemandeInscriptionScalarWhereWithAggregatesInput | DemandeInscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DemandeInscription"> | string
    nom?: StringWithAggregatesFilter<"DemandeInscription"> | string
    prenom?: StringWithAggregatesFilter<"DemandeInscription"> | string
    email?: StringWithAggregatesFilter<"DemandeInscription"> | string
    telephone?: StringNullableWithAggregatesFilter<"DemandeInscription"> | string | null
    message?: StringNullableWithAggregatesFilter<"DemandeInscription"> | string | null
    formationId?: StringNullableWithAggregatesFilter<"DemandeInscription"> | string | null
    userId?: StringNullableWithAggregatesFilter<"DemandeInscription"> | string | null
    statut?: EnumStatutInscriptionWithAggregatesFilter<"DemandeInscription"> | $Enums.StatutInscription
    createdAt?: DateTimeWithAggregatesFilter<"DemandeInscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DemandeInscription"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    nom?: StringFilter<"Document"> | string
    url?: StringFilter<"Document"> | string
    taille?: IntNullableFilter<"Document"> | number | null
    mimeType?: StringNullableFilter<"Document"> | string | null
    uploaderId?: StringFilter<"Document"> | string
    formationId?: StringNullableFilter<"Document"> | string | null
    public?: BoolFilter<"Document"> | boolean
    createdAt?: DateTimeFilter<"Document"> | Date | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    formation?: XOR<FormationNullableScalarRelationFilter, FormationWhereInput> | null
    signatures?: SignatureListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    url?: SortOrder
    taille?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    uploaderId?: SortOrder
    formationId?: SortOrderInput | SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    uploader?: UserOrderByWithRelationInput
    formation?: FormationOrderByWithRelationInput
    signatures?: SignatureOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    nom?: StringFilter<"Document"> | string
    url?: StringFilter<"Document"> | string
    taille?: IntNullableFilter<"Document"> | number | null
    mimeType?: StringNullableFilter<"Document"> | string | null
    uploaderId?: StringFilter<"Document"> | string
    formationId?: StringNullableFilter<"Document"> | string | null
    public?: BoolFilter<"Document"> | boolean
    createdAt?: DateTimeFilter<"Document"> | Date | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    formation?: XOR<FormationNullableScalarRelationFilter, FormationWhereInput> | null
    signatures?: SignatureListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    url?: SortOrder
    taille?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    uploaderId?: SortOrder
    formationId?: SortOrderInput | SortOrder
    public?: SortOrder
    createdAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    nom?: StringWithAggregatesFilter<"Document"> | string
    url?: StringWithAggregatesFilter<"Document"> | string
    taille?: IntNullableWithAggregatesFilter<"Document"> | number | null
    mimeType?: StringNullableWithAggregatesFilter<"Document"> | string | null
    uploaderId?: StringWithAggregatesFilter<"Document"> | string
    formationId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    public?: BoolWithAggregatesFilter<"Document"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type SignatureWhereInput = {
    AND?: SignatureWhereInput | SignatureWhereInput[]
    OR?: SignatureWhereInput[]
    NOT?: SignatureWhereInput | SignatureWhereInput[]
    id?: StringFilter<"Signature"> | string
    documentId?: StringFilter<"Signature"> | string
    userId?: StringFilter<"Signature"> | string
    signedAt?: DateTimeFilter<"Signature"> | Date | string
    signatureUrl?: StringNullableFilter<"Signature"> | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SignatureOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    signedAt?: SortOrder
    signatureUrl?: SortOrderInput | SortOrder
    document?: DocumentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SignatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_userId?: SignatureDocumentIdUserIdCompoundUniqueInput
    AND?: SignatureWhereInput | SignatureWhereInput[]
    OR?: SignatureWhereInput[]
    NOT?: SignatureWhereInput | SignatureWhereInput[]
    documentId?: StringFilter<"Signature"> | string
    userId?: StringFilter<"Signature"> | string
    signedAt?: DateTimeFilter<"Signature"> | Date | string
    signatureUrl?: StringNullableFilter<"Signature"> | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "documentId_userId">

  export type SignatureOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    signedAt?: SortOrder
    signatureUrl?: SortOrderInput | SortOrder
    _count?: SignatureCountOrderByAggregateInput
    _max?: SignatureMaxOrderByAggregateInput
    _min?: SignatureMinOrderByAggregateInput
  }

  export type SignatureScalarWhereWithAggregatesInput = {
    AND?: SignatureScalarWhereWithAggregatesInput | SignatureScalarWhereWithAggregatesInput[]
    OR?: SignatureScalarWhereWithAggregatesInput[]
    NOT?: SignatureScalarWhereWithAggregatesInput | SignatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Signature"> | string
    documentId?: StringWithAggregatesFilter<"Signature"> | string
    userId?: StringWithAggregatesFilter<"Signature"> | string
    signedAt?: DateTimeWithAggregatesFilter<"Signature"> | Date | string
    signatureUrl?: StringNullableWithAggregatesFilter<"Signature"> | string | null
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    expediteurId?: StringFilter<"Message"> | string
    sujet?: StringNullableFilter<"Message"> | string | null
    contenu?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    expediteur?: XOR<UserScalarRelationFilter, UserWhereInput>
    destinataires?: MessageDestinataireListRelationFilter
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    expediteurId?: SortOrder
    sujet?: SortOrderInput | SortOrder
    contenu?: SortOrder
    createdAt?: SortOrder
    expediteur?: UserOrderByWithRelationInput
    destinataires?: MessageDestinataireOrderByRelationAggregateInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    expediteurId?: StringFilter<"Message"> | string
    sujet?: StringNullableFilter<"Message"> | string | null
    contenu?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    expediteur?: XOR<UserScalarRelationFilter, UserWhereInput>
    destinataires?: MessageDestinataireListRelationFilter
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    expediteurId?: SortOrder
    sujet?: SortOrderInput | SortOrder
    contenu?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    expediteurId?: StringWithAggregatesFilter<"Message"> | string
    sujet?: StringNullableWithAggregatesFilter<"Message"> | string | null
    contenu?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type MessageDestinataireWhereInput = {
    AND?: MessageDestinataireWhereInput | MessageDestinataireWhereInput[]
    OR?: MessageDestinataireWhereInput[]
    NOT?: MessageDestinataireWhereInput | MessageDestinataireWhereInput[]
    id?: StringFilter<"MessageDestinataire"> | string
    messageId?: StringFilter<"MessageDestinataire"> | string
    userId?: StringFilter<"MessageDestinataire"> | string
    lu?: BoolFilter<"MessageDestinataire"> | boolean
    luAt?: DateTimeNullableFilter<"MessageDestinataire"> | Date | string | null
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageDestinataireOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    lu?: SortOrder
    luAt?: SortOrderInput | SortOrder
    message?: MessageOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MessageDestinataireWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    messageId_userId?: MessageDestinataireMessageIdUserIdCompoundUniqueInput
    AND?: MessageDestinataireWhereInput | MessageDestinataireWhereInput[]
    OR?: MessageDestinataireWhereInput[]
    NOT?: MessageDestinataireWhereInput | MessageDestinataireWhereInput[]
    messageId?: StringFilter<"MessageDestinataire"> | string
    userId?: StringFilter<"MessageDestinataire"> | string
    lu?: BoolFilter<"MessageDestinataire"> | boolean
    luAt?: DateTimeNullableFilter<"MessageDestinataire"> | Date | string | null
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "messageId_userId">

  export type MessageDestinataireOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    lu?: SortOrder
    luAt?: SortOrderInput | SortOrder
    _count?: MessageDestinataireCountOrderByAggregateInput
    _max?: MessageDestinataireMaxOrderByAggregateInput
    _min?: MessageDestinataireMinOrderByAggregateInput
  }

  export type MessageDestinataireScalarWhereWithAggregatesInput = {
    AND?: MessageDestinataireScalarWhereWithAggregatesInput | MessageDestinataireScalarWhereWithAggregatesInput[]
    OR?: MessageDestinataireScalarWhereWithAggregatesInput[]
    NOT?: MessageDestinataireScalarWhereWithAggregatesInput | MessageDestinataireScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageDestinataire"> | string
    messageId?: StringWithAggregatesFilter<"MessageDestinataire"> | string
    userId?: StringWithAggregatesFilter<"MessageDestinataire"> | string
    lu?: BoolWithAggregatesFilter<"MessageDestinataire"> | boolean
    luAt?: DateTimeNullableWithAggregatesFilter<"MessageDestinataire"> | Date | string | null
  }

  export type CovoiturageWhereInput = {
    AND?: CovoiturageWhereInput | CovoiturageWhereInput[]
    OR?: CovoiturageWhereInput[]
    NOT?: CovoiturageWhereInput | CovoiturageWhereInput[]
    id?: StringFilter<"Covoiturage"> | string
    conducteurId?: StringFilter<"Covoiturage"> | string
    depart?: StringFilter<"Covoiturage"> | string
    destination?: StringFilter<"Covoiturage"> | string
    dateDepart?: DateTimeFilter<"Covoiturage"> | Date | string
    places?: IntFilter<"Covoiturage"> | number
    statut?: EnumStatutCovoiturageFilter<"Covoiturage"> | $Enums.StatutCovoiturage
    commentaire?: StringNullableFilter<"Covoiturage"> | string | null
    createdAt?: DateTimeFilter<"Covoiturage"> | Date | string
    conducteur?: XOR<UserScalarRelationFilter, UserWhereInput>
    passagers?: CovoituragePassagerListRelationFilter
  }

  export type CovoiturageOrderByWithRelationInput = {
    id?: SortOrder
    conducteurId?: SortOrder
    depart?: SortOrder
    destination?: SortOrder
    dateDepart?: SortOrder
    places?: SortOrder
    statut?: SortOrder
    commentaire?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    conducteur?: UserOrderByWithRelationInput
    passagers?: CovoituragePassagerOrderByRelationAggregateInput
  }

  export type CovoiturageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CovoiturageWhereInput | CovoiturageWhereInput[]
    OR?: CovoiturageWhereInput[]
    NOT?: CovoiturageWhereInput | CovoiturageWhereInput[]
    conducteurId?: StringFilter<"Covoiturage"> | string
    depart?: StringFilter<"Covoiturage"> | string
    destination?: StringFilter<"Covoiturage"> | string
    dateDepart?: DateTimeFilter<"Covoiturage"> | Date | string
    places?: IntFilter<"Covoiturage"> | number
    statut?: EnumStatutCovoiturageFilter<"Covoiturage"> | $Enums.StatutCovoiturage
    commentaire?: StringNullableFilter<"Covoiturage"> | string | null
    createdAt?: DateTimeFilter<"Covoiturage"> | Date | string
    conducteur?: XOR<UserScalarRelationFilter, UserWhereInput>
    passagers?: CovoituragePassagerListRelationFilter
  }, "id">

  export type CovoiturageOrderByWithAggregationInput = {
    id?: SortOrder
    conducteurId?: SortOrder
    depart?: SortOrder
    destination?: SortOrder
    dateDepart?: SortOrder
    places?: SortOrder
    statut?: SortOrder
    commentaire?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CovoiturageCountOrderByAggregateInput
    _avg?: CovoiturageAvgOrderByAggregateInput
    _max?: CovoiturageMaxOrderByAggregateInput
    _min?: CovoiturageMinOrderByAggregateInput
    _sum?: CovoiturageSumOrderByAggregateInput
  }

  export type CovoiturageScalarWhereWithAggregatesInput = {
    AND?: CovoiturageScalarWhereWithAggregatesInput | CovoiturageScalarWhereWithAggregatesInput[]
    OR?: CovoiturageScalarWhereWithAggregatesInput[]
    NOT?: CovoiturageScalarWhereWithAggregatesInput | CovoiturageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Covoiturage"> | string
    conducteurId?: StringWithAggregatesFilter<"Covoiturage"> | string
    depart?: StringWithAggregatesFilter<"Covoiturage"> | string
    destination?: StringWithAggregatesFilter<"Covoiturage"> | string
    dateDepart?: DateTimeWithAggregatesFilter<"Covoiturage"> | Date | string
    places?: IntWithAggregatesFilter<"Covoiturage"> | number
    statut?: EnumStatutCovoiturageWithAggregatesFilter<"Covoiturage"> | $Enums.StatutCovoiturage
    commentaire?: StringNullableWithAggregatesFilter<"Covoiturage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Covoiturage"> | Date | string
  }

  export type CovoituragePassagerWhereInput = {
    AND?: CovoituragePassagerWhereInput | CovoituragePassagerWhereInput[]
    OR?: CovoituragePassagerWhereInput[]
    NOT?: CovoituragePassagerWhereInput | CovoituragePassagerWhereInput[]
    id?: StringFilter<"CovoituragePassager"> | string
    covoiturageId?: StringFilter<"CovoituragePassager"> | string
    userId?: StringFilter<"CovoituragePassager"> | string
    createdAt?: DateTimeFilter<"CovoituragePassager"> | Date | string
    covoiturage?: XOR<CovoiturageScalarRelationFilter, CovoiturageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CovoituragePassagerOrderByWithRelationInput = {
    id?: SortOrder
    covoiturageId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    covoiturage?: CovoiturageOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CovoituragePassagerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    covoiturageId_userId?: CovoituragePassagerCovoiturageIdUserIdCompoundUniqueInput
    AND?: CovoituragePassagerWhereInput | CovoituragePassagerWhereInput[]
    OR?: CovoituragePassagerWhereInput[]
    NOT?: CovoituragePassagerWhereInput | CovoituragePassagerWhereInput[]
    covoiturageId?: StringFilter<"CovoituragePassager"> | string
    userId?: StringFilter<"CovoituragePassager"> | string
    createdAt?: DateTimeFilter<"CovoituragePassager"> | Date | string
    covoiturage?: XOR<CovoiturageScalarRelationFilter, CovoiturageWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "covoiturageId_userId">

  export type CovoituragePassagerOrderByWithAggregationInput = {
    id?: SortOrder
    covoiturageId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: CovoituragePassagerCountOrderByAggregateInput
    _max?: CovoituragePassagerMaxOrderByAggregateInput
    _min?: CovoituragePassagerMinOrderByAggregateInput
  }

  export type CovoituragePassagerScalarWhereWithAggregatesInput = {
    AND?: CovoituragePassagerScalarWhereWithAggregatesInput | CovoituragePassagerScalarWhereWithAggregatesInput[]
    OR?: CovoituragePassagerScalarWhereWithAggregatesInput[]
    NOT?: CovoituragePassagerScalarWhereWithAggregatesInput | CovoituragePassagerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CovoituragePassager"> | string
    covoiturageId?: StringWithAggregatesFilter<"CovoituragePassager"> | string
    userId?: StringWithAggregatesFilter<"CovoituragePassager"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CovoituragePassager"> | Date | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    titre?: StringFilter<"Article"> | string
    contenu?: StringFilter<"Article"> | string
    publie?: BoolFilter<"Article"> | boolean
    auteurId?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    auteur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    publie?: SortOrder
    auteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auteur?: UserOrderByWithRelationInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    titre?: StringFilter<"Article"> | string
    contenu?: StringFilter<"Article"> | string
    publie?: BoolFilter<"Article"> | boolean
    auteurId?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    auteur?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    publie?: SortOrder
    auteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    titre?: StringWithAggregatesFilter<"Article"> | string
    contenu?: StringWithAggregatesFilter<"Article"> | string
    publie?: BoolWithAggregatesFilter<"Article"> | boolean
    auteurId?: StringWithAggregatesFilter<"Article"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormationCreateInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutFormationInput
    inscriptions?: InscriptionCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionCreateNestedManyWithoutFormationInput
    documents?: DocumentCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutFormationInput
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionUncheckedCreateNestedManyWithoutFormationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutFormationNestedInput
    inscriptions?: InscriptionUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUpdateManyWithoutFormationNestedInput
    documents?: DocumentUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutFormationNestedInput
    inscriptions?: InscriptionUncheckedUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUncheckedUpdateManyWithoutFormationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type FormationCreateManyInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    dateDebut: Date | string
    dateFin: Date | string
    lieu?: string | null
    lienVisio?: string | null
    createdAt?: Date | string
    formation: FormationCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    formationId: string
    dateDebut: Date | string
    dateFin: Date | string
    lieu?: string | null
    lienVisio?: string | null
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    formationId: string
    dateDebut: Date | string
    dateFin: Date | string
    lieu?: string | null
    lienVisio?: string | null
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCreateInput = {
    id?: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInscriptionsInput
    formation: FormationCreateNestedOneWithoutInscriptionsInput
  }

  export type InscriptionUncheckedCreateInput = {
    id?: string
    userId: string
    formationId: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInscriptionsNestedInput
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
  }

  export type InscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionCreateManyInput = {
    id?: string
    userId: string
    formationId: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
    formation?: FormationCreateNestedOneWithoutDemandesInput
    user?: UserCreateNestedOneWithoutDemandesInscriptionInput
  }

  export type DemandeInscriptionUncheckedCreateInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    formationId?: string | null
    userId?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemandeInscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneWithoutDemandesNestedInput
    user?: UserUpdateOneWithoutDemandesInscriptionNestedInput
  }

  export type DemandeInscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionCreateManyInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    formationId?: string | null
    userId?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemandeInscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    public?: boolean
    createdAt?: Date | string
    uploader: UserCreateNestedOneWithoutDocumentsUploadInput
    formation?: FormationCreateNestedOneWithoutDocumentsInput
    signatures?: SignatureCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    uploaderId: string
    formationId?: string | null
    public?: boolean
    createdAt?: Date | string
    signatures?: SignatureUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: UserUpdateOneRequiredWithoutDocumentsUploadNestedInput
    formation?: FormationUpdateOneWithoutDocumentsNestedInput
    signatures?: SignatureUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploaderId?: StringFieldUpdateOperationsInput | string
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatures?: SignatureUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    uploaderId: string
    formationId?: string | null
    public?: boolean
    createdAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploaderId?: StringFieldUpdateOperationsInput | string
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureCreateInput = {
    id?: string
    signedAt?: Date | string
    signatureUrl?: string | null
    document: DocumentCreateNestedOneWithoutSignaturesInput
    user: UserCreateNestedOneWithoutSignaturesInput
  }

  export type SignatureUncheckedCreateInput = {
    id?: string
    documentId: string
    userId: string
    signedAt?: Date | string
    signatureUrl?: string | null
  }

  export type SignatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    document?: DocumentUpdateOneRequiredWithoutSignaturesNestedInput
    user?: UserUpdateOneRequiredWithoutSignaturesNestedInput
  }

  export type SignatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignatureCreateManyInput = {
    id?: string
    documentId: string
    userId: string
    signedAt?: Date | string
    signatureUrl?: string | null
  }

  export type SignatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageCreateInput = {
    id?: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
    expediteur: UserCreateNestedOneWithoutMessagesEnvoyesInput
    destinataires?: MessageDestinataireCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    expediteurId: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
    destinataires?: MessageDestinataireUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expediteur?: UserUpdateOneRequiredWithoutMessagesEnvoyesNestedInput
    destinataires?: MessageDestinataireUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expediteurId?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destinataires?: MessageDestinataireUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageCreateManyInput = {
    id?: string
    expediteurId: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expediteurId?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageDestinataireCreateInput = {
    id?: string
    lu?: boolean
    luAt?: Date | string | null
    message: MessageCreateNestedOneWithoutDestinatairesInput
    user: UserCreateNestedOneWithoutMessagesRecusInput
  }

  export type MessageDestinataireUncheckedCreateInput = {
    id?: string
    messageId: string
    userId: string
    lu?: boolean
    luAt?: Date | string | null
  }

  export type MessageDestinataireUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    message?: MessageUpdateOneRequiredWithoutDestinatairesNestedInput
    user?: UserUpdateOneRequiredWithoutMessagesRecusNestedInput
  }

  export type MessageDestinataireUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageDestinataireCreateManyInput = {
    id?: string
    messageId: string
    userId: string
    lu?: boolean
    luAt?: Date | string | null
  }

  export type MessageDestinataireUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageDestinataireUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CovoiturageCreateInput = {
    id?: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
    conducteur: UserCreateNestedOneWithoutCovoituragesConduitInput
    passagers?: CovoituragePassagerCreateNestedManyWithoutCovoiturageInput
  }

  export type CovoiturageUncheckedCreateInput = {
    id?: string
    conducteurId: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
    passagers?: CovoituragePassagerUncheckedCreateNestedManyWithoutCovoiturageInput
  }

  export type CovoiturageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conducteur?: UserUpdateOneRequiredWithoutCovoituragesConduitNestedInput
    passagers?: CovoituragePassagerUpdateManyWithoutCovoiturageNestedInput
  }

  export type CovoiturageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conducteurId?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passagers?: CovoituragePassagerUncheckedUpdateManyWithoutCovoiturageNestedInput
  }

  export type CovoiturageCreateManyInput = {
    id?: string
    conducteurId: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
  }

  export type CovoiturageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoiturageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conducteurId?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoituragePassagerCreateInput = {
    id?: string
    createdAt?: Date | string
    covoiturage: CovoiturageCreateNestedOneWithoutPassagersInput
    user: UserCreateNestedOneWithoutCovoituragesPassagerInput
  }

  export type CovoituragePassagerUncheckedCreateInput = {
    id?: string
    covoiturageId: string
    userId: string
    createdAt?: Date | string
  }

  export type CovoituragePassagerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    covoiturage?: CovoiturageUpdateOneRequiredWithoutPassagersNestedInput
    user?: UserUpdateOneRequiredWithoutCovoituragesPassagerNestedInput
  }

  export type CovoituragePassagerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    covoiturageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoituragePassagerCreateManyInput = {
    id?: string
    covoiturageId: string
    userId: string
    createdAt?: Date | string
  }

  export type CovoituragePassagerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoituragePassagerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    covoiturageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateInput = {
    id?: string
    titre: string
    contenu: string
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auteur: UserCreateNestedOneWithoutArticlesInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    titre: string
    contenu: string
    publie?: boolean
    auteurId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auteur?: UserUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    auteurId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateManyInput = {
    id?: string
    titre: string
    contenu: string
    publie?: boolean
    auteurId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    auteurId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InscriptionListRelationFilter = {
    every?: InscriptionWhereInput
    some?: InscriptionWhereInput
    none?: InscriptionWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type SignatureListRelationFilter = {
    every?: SignatureWhereInput
    some?: SignatureWhereInput
    none?: SignatureWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageDestinataireListRelationFilter = {
    every?: MessageDestinataireWhereInput
    some?: MessageDestinataireWhereInput
    none?: MessageDestinataireWhereInput
  }

  export type CovoiturageListRelationFilter = {
    every?: CovoiturageWhereInput
    some?: CovoiturageWhereInput
    none?: CovoiturageWhereInput
  }

  export type CovoituragePassagerListRelationFilter = {
    every?: CovoituragePassagerWhereInput
    some?: CovoituragePassagerWhereInput
    none?: CovoituragePassagerWhereInput
  }

  export type ArticleListRelationFilter = {
    every?: ArticleWhereInput
    some?: ArticleWhereInput
    none?: ArticleWhereInput
  }

  export type DemandeInscriptionListRelationFilter = {
    every?: DemandeInscriptionWhereInput
    some?: DemandeInscriptionWhereInput
    none?: DemandeInscriptionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SignatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageDestinataireOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CovoiturageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CovoituragePassagerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DemandeInscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    telephone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    actif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTypeFormationFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeFormation | EnumTypeFormationFieldRefInput<$PrismaModel>
    in?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeFormationFilter<$PrismaModel> | $Enums.TypeFormation
  }

  export type EnumStatutFormationFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFormation | EnumStatutFormationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFormationFilter<$PrismaModel> | $Enums.StatutFormation
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormationCountOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    type?: SortOrder
    statut?: SortOrder
    dureeHeures?: SortOrder
    prix?: SortOrder
    places?: SortOrder
    lienVisio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormationAvgOrderByAggregateInput = {
    dureeHeures?: SortOrder
    prix?: SortOrder
    places?: SortOrder
  }

  export type FormationMaxOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    type?: SortOrder
    statut?: SortOrder
    dureeHeures?: SortOrder
    prix?: SortOrder
    places?: SortOrder
    lienVisio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormationMinOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    type?: SortOrder
    statut?: SortOrder
    dureeHeures?: SortOrder
    prix?: SortOrder
    places?: SortOrder
    lienVisio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormationSumOrderByAggregateInput = {
    dureeHeures?: SortOrder
    prix?: SortOrder
    places?: SortOrder
  }

  export type EnumTypeFormationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeFormation | EnumTypeFormationFieldRefInput<$PrismaModel>
    in?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeFormationWithAggregatesFilter<$PrismaModel> | $Enums.TypeFormation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeFormationFilter<$PrismaModel>
    _max?: NestedEnumTypeFormationFilter<$PrismaModel>
  }

  export type EnumStatutFormationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFormation | EnumStatutFormationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFormationWithAggregatesFilter<$PrismaModel> | $Enums.StatutFormation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutFormationFilter<$PrismaModel>
    _max?: NestedEnumStatutFormationFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FormationScalarRelationFilter = {
    is?: FormationWhereInput
    isNot?: FormationWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    formationId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    lieu?: SortOrder
    lienVisio?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    formationId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    lieu?: SortOrder
    lienVisio?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    formationId?: SortOrder
    dateDebut?: SortOrder
    dateFin?: SortOrder
    lieu?: SortOrder
    lienVisio?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumStatutInscriptionFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutInscription | EnumStatutInscriptionFieldRefInput<$PrismaModel>
    in?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutInscriptionFilter<$PrismaModel> | $Enums.StatutInscription
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type InscriptionUserIdFormationIdCompoundUniqueInput = {
    userId: string
    formationId: string
  }

  export type InscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formationId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formationId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    formationId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatutInscriptionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutInscription | EnumStatutInscriptionFieldRefInput<$PrismaModel>
    in?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutInscriptionWithAggregatesFilter<$PrismaModel> | $Enums.StatutInscription
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutInscriptionFilter<$PrismaModel>
    _max?: NestedEnumStatutInscriptionFilter<$PrismaModel>
  }

  export type FormationNullableScalarRelationFilter = {
    is?: FormationWhereInput | null
    isNot?: FormationWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DemandeInscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    message?: SortOrder
    formationId?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemandeInscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    message?: SortOrder
    formationId?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemandeInscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    prenom?: SortOrder
    email?: SortOrder
    telephone?: SortOrder
    message?: SortOrder
    formationId?: SortOrder
    userId?: SortOrder
    statut?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    url?: SortOrder
    taille?: SortOrder
    mimeType?: SortOrder
    uploaderId?: SortOrder
    formationId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    taille?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    url?: SortOrder
    taille?: SortOrder
    mimeType?: SortOrder
    uploaderId?: SortOrder
    formationId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    url?: SortOrder
    taille?: SortOrder
    mimeType?: SortOrder
    uploaderId?: SortOrder
    formationId?: SortOrder
    public?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    taille?: SortOrder
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type SignatureDocumentIdUserIdCompoundUniqueInput = {
    documentId: string
    userId: string
  }

  export type SignatureCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    signedAt?: SortOrder
    signatureUrl?: SortOrder
  }

  export type SignatureMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    signedAt?: SortOrder
    signatureUrl?: SortOrder
  }

  export type SignatureMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    signedAt?: SortOrder
    signatureUrl?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    expediteurId?: SortOrder
    sujet?: SortOrder
    contenu?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    expediteurId?: SortOrder
    sujet?: SortOrder
    contenu?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    expediteurId?: SortOrder
    sujet?: SortOrder
    contenu?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput
    isNot?: MessageWhereInput
  }

  export type MessageDestinataireMessageIdUserIdCompoundUniqueInput = {
    messageId: string
    userId: string
  }

  export type MessageDestinataireCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    lu?: SortOrder
    luAt?: SortOrder
  }

  export type MessageDestinataireMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    lu?: SortOrder
    luAt?: SortOrder
  }

  export type MessageDestinataireMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    userId?: SortOrder
    lu?: SortOrder
    luAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumStatutCovoiturageFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutCovoiturage | EnumStatutCovoiturageFieldRefInput<$PrismaModel>
    in?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutCovoiturageFilter<$PrismaModel> | $Enums.StatutCovoiturage
  }

  export type CovoiturageCountOrderByAggregateInput = {
    id?: SortOrder
    conducteurId?: SortOrder
    depart?: SortOrder
    destination?: SortOrder
    dateDepart?: SortOrder
    places?: SortOrder
    statut?: SortOrder
    commentaire?: SortOrder
    createdAt?: SortOrder
  }

  export type CovoiturageAvgOrderByAggregateInput = {
    places?: SortOrder
  }

  export type CovoiturageMaxOrderByAggregateInput = {
    id?: SortOrder
    conducteurId?: SortOrder
    depart?: SortOrder
    destination?: SortOrder
    dateDepart?: SortOrder
    places?: SortOrder
    statut?: SortOrder
    commentaire?: SortOrder
    createdAt?: SortOrder
  }

  export type CovoiturageMinOrderByAggregateInput = {
    id?: SortOrder
    conducteurId?: SortOrder
    depart?: SortOrder
    destination?: SortOrder
    dateDepart?: SortOrder
    places?: SortOrder
    statut?: SortOrder
    commentaire?: SortOrder
    createdAt?: SortOrder
  }

  export type CovoiturageSumOrderByAggregateInput = {
    places?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumStatutCovoiturageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutCovoiturage | EnumStatutCovoiturageFieldRefInput<$PrismaModel>
    in?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutCovoiturageWithAggregatesFilter<$PrismaModel> | $Enums.StatutCovoiturage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutCovoiturageFilter<$PrismaModel>
    _max?: NestedEnumStatutCovoiturageFilter<$PrismaModel>
  }

  export type CovoiturageScalarRelationFilter = {
    is?: CovoiturageWhereInput
    isNot?: CovoiturageWhereInput
  }

  export type CovoituragePassagerCovoiturageIdUserIdCompoundUniqueInput = {
    covoiturageId: string
    userId: string
  }

  export type CovoituragePassagerCountOrderByAggregateInput = {
    id?: SortOrder
    covoiturageId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type CovoituragePassagerMaxOrderByAggregateInput = {
    id?: SortOrder
    covoiturageId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type CovoituragePassagerMinOrderByAggregateInput = {
    id?: SortOrder
    covoiturageId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    publie?: SortOrder
    auteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    publie?: SortOrder
    auteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    titre?: SortOrder
    contenu?: SortOrder
    publie?: SortOrder
    auteurId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InscriptionCreateNestedManyWithoutUserInput = {
    create?: XOR<InscriptionCreateWithoutUserInput, InscriptionUncheckedCreateWithoutUserInput> | InscriptionCreateWithoutUserInput[] | InscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutUserInput | InscriptionCreateOrConnectWithoutUserInput[]
    createMany?: InscriptionCreateManyUserInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutUploaderInput = {
    create?: XOR<DocumentCreateWithoutUploaderInput, DocumentUncheckedCreateWithoutUploaderInput> | DocumentCreateWithoutUploaderInput[] | DocumentUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUploaderInput | DocumentCreateOrConnectWithoutUploaderInput[]
    createMany?: DocumentCreateManyUploaderInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type SignatureCreateNestedManyWithoutUserInput = {
    create?: XOR<SignatureCreateWithoutUserInput, SignatureUncheckedCreateWithoutUserInput> | SignatureCreateWithoutUserInput[] | SignatureUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutUserInput | SignatureCreateOrConnectWithoutUserInput[]
    createMany?: SignatureCreateManyUserInputEnvelope
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutExpediteurInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageDestinataireCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageDestinataireCreateWithoutUserInput, MessageDestinataireUncheckedCreateWithoutUserInput> | MessageDestinataireCreateWithoutUserInput[] | MessageDestinataireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutUserInput | MessageDestinataireCreateOrConnectWithoutUserInput[]
    createMany?: MessageDestinataireCreateManyUserInputEnvelope
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
  }

  export type CovoiturageCreateNestedManyWithoutConducteurInput = {
    create?: XOR<CovoiturageCreateWithoutConducteurInput, CovoiturageUncheckedCreateWithoutConducteurInput> | CovoiturageCreateWithoutConducteurInput[] | CovoiturageUncheckedCreateWithoutConducteurInput[]
    connectOrCreate?: CovoiturageCreateOrConnectWithoutConducteurInput | CovoiturageCreateOrConnectWithoutConducteurInput[]
    createMany?: CovoiturageCreateManyConducteurInputEnvelope
    connect?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
  }

  export type CovoituragePassagerCreateNestedManyWithoutUserInput = {
    create?: XOR<CovoituragePassagerCreateWithoutUserInput, CovoituragePassagerUncheckedCreateWithoutUserInput> | CovoituragePassagerCreateWithoutUserInput[] | CovoituragePassagerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutUserInput | CovoituragePassagerCreateOrConnectWithoutUserInput[]
    createMany?: CovoituragePassagerCreateManyUserInputEnvelope
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
  }

  export type ArticleCreateNestedManyWithoutAuteurInput = {
    create?: XOR<ArticleCreateWithoutAuteurInput, ArticleUncheckedCreateWithoutAuteurInput> | ArticleCreateWithoutAuteurInput[] | ArticleUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuteurInput | ArticleCreateOrConnectWithoutAuteurInput[]
    createMany?: ArticleCreateManyAuteurInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type DemandeInscriptionCreateNestedManyWithoutUserInput = {
    create?: XOR<DemandeInscriptionCreateWithoutUserInput, DemandeInscriptionUncheckedCreateWithoutUserInput> | DemandeInscriptionCreateWithoutUserInput[] | DemandeInscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutUserInput | DemandeInscriptionCreateOrConnectWithoutUserInput[]
    createMany?: DemandeInscriptionCreateManyUserInputEnvelope
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
  }

  export type InscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InscriptionCreateWithoutUserInput, InscriptionUncheckedCreateWithoutUserInput> | InscriptionCreateWithoutUserInput[] | InscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutUserInput | InscriptionCreateOrConnectWithoutUserInput[]
    createMany?: InscriptionCreateManyUserInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<DocumentCreateWithoutUploaderInput, DocumentUncheckedCreateWithoutUploaderInput> | DocumentCreateWithoutUploaderInput[] | DocumentUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUploaderInput | DocumentCreateOrConnectWithoutUploaderInput[]
    createMany?: DocumentCreateManyUploaderInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type SignatureUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SignatureCreateWithoutUserInput, SignatureUncheckedCreateWithoutUserInput> | SignatureCreateWithoutUserInput[] | SignatureUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutUserInput | SignatureCreateOrConnectWithoutUserInput[]
    createMany?: SignatureCreateManyUserInputEnvelope
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutExpediteurInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageDestinataireUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageDestinataireCreateWithoutUserInput, MessageDestinataireUncheckedCreateWithoutUserInput> | MessageDestinataireCreateWithoutUserInput[] | MessageDestinataireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutUserInput | MessageDestinataireCreateOrConnectWithoutUserInput[]
    createMany?: MessageDestinataireCreateManyUserInputEnvelope
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
  }

  export type CovoiturageUncheckedCreateNestedManyWithoutConducteurInput = {
    create?: XOR<CovoiturageCreateWithoutConducteurInput, CovoiturageUncheckedCreateWithoutConducteurInput> | CovoiturageCreateWithoutConducteurInput[] | CovoiturageUncheckedCreateWithoutConducteurInput[]
    connectOrCreate?: CovoiturageCreateOrConnectWithoutConducteurInput | CovoiturageCreateOrConnectWithoutConducteurInput[]
    createMany?: CovoiturageCreateManyConducteurInputEnvelope
    connect?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
  }

  export type CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CovoituragePassagerCreateWithoutUserInput, CovoituragePassagerUncheckedCreateWithoutUserInput> | CovoituragePassagerCreateWithoutUserInput[] | CovoituragePassagerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutUserInput | CovoituragePassagerCreateOrConnectWithoutUserInput[]
    createMany?: CovoituragePassagerCreateManyUserInputEnvelope
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutAuteurInput = {
    create?: XOR<ArticleCreateWithoutAuteurInput, ArticleUncheckedCreateWithoutAuteurInput> | ArticleCreateWithoutAuteurInput[] | ArticleUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuteurInput | ArticleCreateOrConnectWithoutAuteurInput[]
    createMany?: ArticleCreateManyAuteurInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DemandeInscriptionCreateWithoutUserInput, DemandeInscriptionUncheckedCreateWithoutUserInput> | DemandeInscriptionCreateWithoutUserInput[] | DemandeInscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutUserInput | DemandeInscriptionCreateOrConnectWithoutUserInput[]
    createMany?: DemandeInscriptionCreateManyUserInputEnvelope
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InscriptionUpdateManyWithoutUserNestedInput = {
    create?: XOR<InscriptionCreateWithoutUserInput, InscriptionUncheckedCreateWithoutUserInput> | InscriptionCreateWithoutUserInput[] | InscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutUserInput | InscriptionCreateOrConnectWithoutUserInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutUserInput | InscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InscriptionCreateManyUserInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutUserInput | InscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutUserInput | InscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<DocumentCreateWithoutUploaderInput, DocumentUncheckedCreateWithoutUploaderInput> | DocumentCreateWithoutUploaderInput[] | DocumentUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUploaderInput | DocumentCreateOrConnectWithoutUploaderInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUploaderInput | DocumentUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: DocumentCreateManyUploaderInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUploaderInput | DocumentUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUploaderInput | DocumentUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type SignatureUpdateManyWithoutUserNestedInput = {
    create?: XOR<SignatureCreateWithoutUserInput, SignatureUncheckedCreateWithoutUserInput> | SignatureCreateWithoutUserInput[] | SignatureUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutUserInput | SignatureCreateOrConnectWithoutUserInput[]
    upsert?: SignatureUpsertWithWhereUniqueWithoutUserInput | SignatureUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SignatureCreateManyUserInputEnvelope
    set?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    disconnect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    delete?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    update?: SignatureUpdateWithWhereUniqueWithoutUserInput | SignatureUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SignatureUpdateManyWithWhereWithoutUserInput | SignatureUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SignatureScalarWhereInput | SignatureScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutExpediteurNestedInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutExpediteurInput | MessageUpsertWithWhereUniqueWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutExpediteurInput | MessageUpdateWithWhereUniqueWithoutExpediteurInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutExpediteurInput | MessageUpdateManyWithWhereWithoutExpediteurInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageDestinataireUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageDestinataireCreateWithoutUserInput, MessageDestinataireUncheckedCreateWithoutUserInput> | MessageDestinataireCreateWithoutUserInput[] | MessageDestinataireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutUserInput | MessageDestinataireCreateOrConnectWithoutUserInput[]
    upsert?: MessageDestinataireUpsertWithWhereUniqueWithoutUserInput | MessageDestinataireUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageDestinataireCreateManyUserInputEnvelope
    set?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    disconnect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    delete?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    update?: MessageDestinataireUpdateWithWhereUniqueWithoutUserInput | MessageDestinataireUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageDestinataireUpdateManyWithWhereWithoutUserInput | MessageDestinataireUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageDestinataireScalarWhereInput | MessageDestinataireScalarWhereInput[]
  }

  export type CovoiturageUpdateManyWithoutConducteurNestedInput = {
    create?: XOR<CovoiturageCreateWithoutConducteurInput, CovoiturageUncheckedCreateWithoutConducteurInput> | CovoiturageCreateWithoutConducteurInput[] | CovoiturageUncheckedCreateWithoutConducteurInput[]
    connectOrCreate?: CovoiturageCreateOrConnectWithoutConducteurInput | CovoiturageCreateOrConnectWithoutConducteurInput[]
    upsert?: CovoiturageUpsertWithWhereUniqueWithoutConducteurInput | CovoiturageUpsertWithWhereUniqueWithoutConducteurInput[]
    createMany?: CovoiturageCreateManyConducteurInputEnvelope
    set?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    disconnect?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    delete?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    connect?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    update?: CovoiturageUpdateWithWhereUniqueWithoutConducteurInput | CovoiturageUpdateWithWhereUniqueWithoutConducteurInput[]
    updateMany?: CovoiturageUpdateManyWithWhereWithoutConducteurInput | CovoiturageUpdateManyWithWhereWithoutConducteurInput[]
    deleteMany?: CovoiturageScalarWhereInput | CovoiturageScalarWhereInput[]
  }

  export type CovoituragePassagerUpdateManyWithoutUserNestedInput = {
    create?: XOR<CovoituragePassagerCreateWithoutUserInput, CovoituragePassagerUncheckedCreateWithoutUserInput> | CovoituragePassagerCreateWithoutUserInput[] | CovoituragePassagerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutUserInput | CovoituragePassagerCreateOrConnectWithoutUserInput[]
    upsert?: CovoituragePassagerUpsertWithWhereUniqueWithoutUserInput | CovoituragePassagerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CovoituragePassagerCreateManyUserInputEnvelope
    set?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    disconnect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    delete?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    update?: CovoituragePassagerUpdateWithWhereUniqueWithoutUserInput | CovoituragePassagerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CovoituragePassagerUpdateManyWithWhereWithoutUserInput | CovoituragePassagerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CovoituragePassagerScalarWhereInput | CovoituragePassagerScalarWhereInput[]
  }

  export type ArticleUpdateManyWithoutAuteurNestedInput = {
    create?: XOR<ArticleCreateWithoutAuteurInput, ArticleUncheckedCreateWithoutAuteurInput> | ArticleCreateWithoutAuteurInput[] | ArticleUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuteurInput | ArticleCreateOrConnectWithoutAuteurInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutAuteurInput | ArticleUpsertWithWhereUniqueWithoutAuteurInput[]
    createMany?: ArticleCreateManyAuteurInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutAuteurInput | ArticleUpdateWithWhereUniqueWithoutAuteurInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutAuteurInput | ArticleUpdateManyWithWhereWithoutAuteurInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type DemandeInscriptionUpdateManyWithoutUserNestedInput = {
    create?: XOR<DemandeInscriptionCreateWithoutUserInput, DemandeInscriptionUncheckedCreateWithoutUserInput> | DemandeInscriptionCreateWithoutUserInput[] | DemandeInscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutUserInput | DemandeInscriptionCreateOrConnectWithoutUserInput[]
    upsert?: DemandeInscriptionUpsertWithWhereUniqueWithoutUserInput | DemandeInscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DemandeInscriptionCreateManyUserInputEnvelope
    set?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    disconnect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    delete?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    update?: DemandeInscriptionUpdateWithWhereUniqueWithoutUserInput | DemandeInscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DemandeInscriptionUpdateManyWithWhereWithoutUserInput | DemandeInscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DemandeInscriptionScalarWhereInput | DemandeInscriptionScalarWhereInput[]
  }

  export type InscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InscriptionCreateWithoutUserInput, InscriptionUncheckedCreateWithoutUserInput> | InscriptionCreateWithoutUserInput[] | InscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutUserInput | InscriptionCreateOrConnectWithoutUserInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutUserInput | InscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InscriptionCreateManyUserInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutUserInput | InscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutUserInput | InscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<DocumentCreateWithoutUploaderInput, DocumentUncheckedCreateWithoutUploaderInput> | DocumentCreateWithoutUploaderInput[] | DocumentUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUploaderInput | DocumentCreateOrConnectWithoutUploaderInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUploaderInput | DocumentUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: DocumentCreateManyUploaderInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUploaderInput | DocumentUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUploaderInput | DocumentUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type SignatureUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SignatureCreateWithoutUserInput, SignatureUncheckedCreateWithoutUserInput> | SignatureCreateWithoutUserInput[] | SignatureUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutUserInput | SignatureCreateOrConnectWithoutUserInput[]
    upsert?: SignatureUpsertWithWhereUniqueWithoutUserInput | SignatureUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SignatureCreateManyUserInputEnvelope
    set?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    disconnect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    delete?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    update?: SignatureUpdateWithWhereUniqueWithoutUserInput | SignatureUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SignatureUpdateManyWithWhereWithoutUserInput | SignatureUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SignatureScalarWhereInput | SignatureScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutExpediteurNestedInput = {
    create?: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput> | MessageCreateWithoutExpediteurInput[] | MessageUncheckedCreateWithoutExpediteurInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutExpediteurInput | MessageCreateOrConnectWithoutExpediteurInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutExpediteurInput | MessageUpsertWithWhereUniqueWithoutExpediteurInput[]
    createMany?: MessageCreateManyExpediteurInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutExpediteurInput | MessageUpdateWithWhereUniqueWithoutExpediteurInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutExpediteurInput | MessageUpdateManyWithWhereWithoutExpediteurInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageDestinataireCreateWithoutUserInput, MessageDestinataireUncheckedCreateWithoutUserInput> | MessageDestinataireCreateWithoutUserInput[] | MessageDestinataireUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutUserInput | MessageDestinataireCreateOrConnectWithoutUserInput[]
    upsert?: MessageDestinataireUpsertWithWhereUniqueWithoutUserInput | MessageDestinataireUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageDestinataireCreateManyUserInputEnvelope
    set?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    disconnect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    delete?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    update?: MessageDestinataireUpdateWithWhereUniqueWithoutUserInput | MessageDestinataireUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageDestinataireUpdateManyWithWhereWithoutUserInput | MessageDestinataireUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageDestinataireScalarWhereInput | MessageDestinataireScalarWhereInput[]
  }

  export type CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput = {
    create?: XOR<CovoiturageCreateWithoutConducteurInput, CovoiturageUncheckedCreateWithoutConducteurInput> | CovoiturageCreateWithoutConducteurInput[] | CovoiturageUncheckedCreateWithoutConducteurInput[]
    connectOrCreate?: CovoiturageCreateOrConnectWithoutConducteurInput | CovoiturageCreateOrConnectWithoutConducteurInput[]
    upsert?: CovoiturageUpsertWithWhereUniqueWithoutConducteurInput | CovoiturageUpsertWithWhereUniqueWithoutConducteurInput[]
    createMany?: CovoiturageCreateManyConducteurInputEnvelope
    set?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    disconnect?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    delete?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    connect?: CovoiturageWhereUniqueInput | CovoiturageWhereUniqueInput[]
    update?: CovoiturageUpdateWithWhereUniqueWithoutConducteurInput | CovoiturageUpdateWithWhereUniqueWithoutConducteurInput[]
    updateMany?: CovoiturageUpdateManyWithWhereWithoutConducteurInput | CovoiturageUpdateManyWithWhereWithoutConducteurInput[]
    deleteMany?: CovoiturageScalarWhereInput | CovoiturageScalarWhereInput[]
  }

  export type CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CovoituragePassagerCreateWithoutUserInput, CovoituragePassagerUncheckedCreateWithoutUserInput> | CovoituragePassagerCreateWithoutUserInput[] | CovoituragePassagerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutUserInput | CovoituragePassagerCreateOrConnectWithoutUserInput[]
    upsert?: CovoituragePassagerUpsertWithWhereUniqueWithoutUserInput | CovoituragePassagerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CovoituragePassagerCreateManyUserInputEnvelope
    set?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    disconnect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    delete?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    update?: CovoituragePassagerUpdateWithWhereUniqueWithoutUserInput | CovoituragePassagerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CovoituragePassagerUpdateManyWithWhereWithoutUserInput | CovoituragePassagerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CovoituragePassagerScalarWhereInput | CovoituragePassagerScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutAuteurNestedInput = {
    create?: XOR<ArticleCreateWithoutAuteurInput, ArticleUncheckedCreateWithoutAuteurInput> | ArticleCreateWithoutAuteurInput[] | ArticleUncheckedCreateWithoutAuteurInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuteurInput | ArticleCreateOrConnectWithoutAuteurInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutAuteurInput | ArticleUpsertWithWhereUniqueWithoutAuteurInput[]
    createMany?: ArticleCreateManyAuteurInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutAuteurInput | ArticleUpdateWithWhereUniqueWithoutAuteurInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutAuteurInput | ArticleUpdateManyWithWhereWithoutAuteurInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DemandeInscriptionCreateWithoutUserInput, DemandeInscriptionUncheckedCreateWithoutUserInput> | DemandeInscriptionCreateWithoutUserInput[] | DemandeInscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutUserInput | DemandeInscriptionCreateOrConnectWithoutUserInput[]
    upsert?: DemandeInscriptionUpsertWithWhereUniqueWithoutUserInput | DemandeInscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DemandeInscriptionCreateManyUserInputEnvelope
    set?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    disconnect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    delete?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    update?: DemandeInscriptionUpdateWithWhereUniqueWithoutUserInput | DemandeInscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DemandeInscriptionUpdateManyWithWhereWithoutUserInput | DemandeInscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DemandeInscriptionScalarWhereInput | DemandeInscriptionScalarWhereInput[]
  }

  export type SessionCreateNestedManyWithoutFormationInput = {
    create?: XOR<SessionCreateWithoutFormationInput, SessionUncheckedCreateWithoutFormationInput> | SessionCreateWithoutFormationInput[] | SessionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutFormationInput | SessionCreateOrConnectWithoutFormationInput[]
    createMany?: SessionCreateManyFormationInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type InscriptionCreateNestedManyWithoutFormationInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type DemandeInscriptionCreateNestedManyWithoutFormationInput = {
    create?: XOR<DemandeInscriptionCreateWithoutFormationInput, DemandeInscriptionUncheckedCreateWithoutFormationInput> | DemandeInscriptionCreateWithoutFormationInput[] | DemandeInscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutFormationInput | DemandeInscriptionCreateOrConnectWithoutFormationInput[]
    createMany?: DemandeInscriptionCreateManyFormationInputEnvelope
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutFormationInput = {
    create?: XOR<DocumentCreateWithoutFormationInput, DocumentUncheckedCreateWithoutFormationInput> | DocumentCreateWithoutFormationInput[] | DocumentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFormationInput | DocumentCreateOrConnectWithoutFormationInput[]
    createMany?: DocumentCreateManyFormationInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutFormationInput = {
    create?: XOR<SessionCreateWithoutFormationInput, SessionUncheckedCreateWithoutFormationInput> | SessionCreateWithoutFormationInput[] | SessionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutFormationInput | SessionCreateOrConnectWithoutFormationInput[]
    createMany?: SessionCreateManyFormationInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type InscriptionUncheckedCreateNestedManyWithoutFormationInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
  }

  export type DemandeInscriptionUncheckedCreateNestedManyWithoutFormationInput = {
    create?: XOR<DemandeInscriptionCreateWithoutFormationInput, DemandeInscriptionUncheckedCreateWithoutFormationInput> | DemandeInscriptionCreateWithoutFormationInput[] | DemandeInscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutFormationInput | DemandeInscriptionCreateOrConnectWithoutFormationInput[]
    createMany?: DemandeInscriptionCreateManyFormationInputEnvelope
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutFormationInput = {
    create?: XOR<DocumentCreateWithoutFormationInput, DocumentUncheckedCreateWithoutFormationInput> | DocumentCreateWithoutFormationInput[] | DocumentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFormationInput | DocumentCreateOrConnectWithoutFormationInput[]
    createMany?: DocumentCreateManyFormationInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type EnumTypeFormationFieldUpdateOperationsInput = {
    set?: $Enums.TypeFormation
  }

  export type EnumStatutFormationFieldUpdateOperationsInput = {
    set?: $Enums.StatutFormation
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUpdateManyWithoutFormationNestedInput = {
    create?: XOR<SessionCreateWithoutFormationInput, SessionUncheckedCreateWithoutFormationInput> | SessionCreateWithoutFormationInput[] | SessionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutFormationInput | SessionCreateOrConnectWithoutFormationInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutFormationInput | SessionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: SessionCreateManyFormationInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutFormationInput | SessionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutFormationInput | SessionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type InscriptionUpdateManyWithoutFormationNestedInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutFormationInput | InscriptionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutFormationInput | InscriptionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutFormationInput | InscriptionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type DemandeInscriptionUpdateManyWithoutFormationNestedInput = {
    create?: XOR<DemandeInscriptionCreateWithoutFormationInput, DemandeInscriptionUncheckedCreateWithoutFormationInput> | DemandeInscriptionCreateWithoutFormationInput[] | DemandeInscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutFormationInput | DemandeInscriptionCreateOrConnectWithoutFormationInput[]
    upsert?: DemandeInscriptionUpsertWithWhereUniqueWithoutFormationInput | DemandeInscriptionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: DemandeInscriptionCreateManyFormationInputEnvelope
    set?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    disconnect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    delete?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    update?: DemandeInscriptionUpdateWithWhereUniqueWithoutFormationInput | DemandeInscriptionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: DemandeInscriptionUpdateManyWithWhereWithoutFormationInput | DemandeInscriptionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: DemandeInscriptionScalarWhereInput | DemandeInscriptionScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutFormationNestedInput = {
    create?: XOR<DocumentCreateWithoutFormationInput, DocumentUncheckedCreateWithoutFormationInput> | DocumentCreateWithoutFormationInput[] | DocumentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFormationInput | DocumentCreateOrConnectWithoutFormationInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutFormationInput | DocumentUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: DocumentCreateManyFormationInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutFormationInput | DocumentUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutFormationInput | DocumentUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutFormationNestedInput = {
    create?: XOR<SessionCreateWithoutFormationInput, SessionUncheckedCreateWithoutFormationInput> | SessionCreateWithoutFormationInput[] | SessionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutFormationInput | SessionCreateOrConnectWithoutFormationInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutFormationInput | SessionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: SessionCreateManyFormationInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutFormationInput | SessionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutFormationInput | SessionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type InscriptionUncheckedUpdateManyWithoutFormationNestedInput = {
    create?: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput> | InscriptionCreateWithoutFormationInput[] | InscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: InscriptionCreateOrConnectWithoutFormationInput | InscriptionCreateOrConnectWithoutFormationInput[]
    upsert?: InscriptionUpsertWithWhereUniqueWithoutFormationInput | InscriptionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: InscriptionCreateManyFormationInputEnvelope
    set?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    disconnect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    delete?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    connect?: InscriptionWhereUniqueInput | InscriptionWhereUniqueInput[]
    update?: InscriptionUpdateWithWhereUniqueWithoutFormationInput | InscriptionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: InscriptionUpdateManyWithWhereWithoutFormationInput | InscriptionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
  }

  export type DemandeInscriptionUncheckedUpdateManyWithoutFormationNestedInput = {
    create?: XOR<DemandeInscriptionCreateWithoutFormationInput, DemandeInscriptionUncheckedCreateWithoutFormationInput> | DemandeInscriptionCreateWithoutFormationInput[] | DemandeInscriptionUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DemandeInscriptionCreateOrConnectWithoutFormationInput | DemandeInscriptionCreateOrConnectWithoutFormationInput[]
    upsert?: DemandeInscriptionUpsertWithWhereUniqueWithoutFormationInput | DemandeInscriptionUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: DemandeInscriptionCreateManyFormationInputEnvelope
    set?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    disconnect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    delete?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    connect?: DemandeInscriptionWhereUniqueInput | DemandeInscriptionWhereUniqueInput[]
    update?: DemandeInscriptionUpdateWithWhereUniqueWithoutFormationInput | DemandeInscriptionUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: DemandeInscriptionUpdateManyWithWhereWithoutFormationInput | DemandeInscriptionUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: DemandeInscriptionScalarWhereInput | DemandeInscriptionScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutFormationNestedInput = {
    create?: XOR<DocumentCreateWithoutFormationInput, DocumentUncheckedCreateWithoutFormationInput> | DocumentCreateWithoutFormationInput[] | DocumentUncheckedCreateWithoutFormationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFormationInput | DocumentCreateOrConnectWithoutFormationInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutFormationInput | DocumentUpsertWithWhereUniqueWithoutFormationInput[]
    createMany?: DocumentCreateManyFormationInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutFormationInput | DocumentUpdateWithWhereUniqueWithoutFormationInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutFormationInput | DocumentUpdateManyWithWhereWithoutFormationInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FormationCreateNestedOneWithoutSessionsInput = {
    create?: XOR<FormationCreateWithoutSessionsInput, FormationUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutSessionsInput
    connect?: FormationWhereUniqueInput
  }

  export type FormationUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<FormationCreateWithoutSessionsInput, FormationUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutSessionsInput
    upsert?: FormationUpsertWithoutSessionsInput
    connect?: FormationWhereUniqueInput
    update?: XOR<XOR<FormationUpdateToOneWithWhereWithoutSessionsInput, FormationUpdateWithoutSessionsInput>, FormationUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutInscriptionsInput = {
    create?: XOR<UserCreateWithoutInscriptionsInput, UserUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInscriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type FormationCreateNestedOneWithoutInscriptionsInput = {
    create?: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutInscriptionsInput
    connect?: FormationWhereUniqueInput
  }

  export type EnumStatutInscriptionFieldUpdateOperationsInput = {
    set?: $Enums.StatutInscription
  }

  export type UserUpdateOneRequiredWithoutInscriptionsNestedInput = {
    create?: XOR<UserCreateWithoutInscriptionsInput, UserUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInscriptionsInput
    upsert?: UserUpsertWithoutInscriptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInscriptionsInput, UserUpdateWithoutInscriptionsInput>, UserUncheckedUpdateWithoutInscriptionsInput>
  }

  export type FormationUpdateOneRequiredWithoutInscriptionsNestedInput = {
    create?: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutInscriptionsInput
    upsert?: FormationUpsertWithoutInscriptionsInput
    connect?: FormationWhereUniqueInput
    update?: XOR<XOR<FormationUpdateToOneWithWhereWithoutInscriptionsInput, FormationUpdateWithoutInscriptionsInput>, FormationUncheckedUpdateWithoutInscriptionsInput>
  }

  export type FormationCreateNestedOneWithoutDemandesInput = {
    create?: XOR<FormationCreateWithoutDemandesInput, FormationUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: FormationCreateOrConnectWithoutDemandesInput
    connect?: FormationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDemandesInscriptionInput = {
    create?: XOR<UserCreateWithoutDemandesInscriptionInput, UserUncheckedCreateWithoutDemandesInscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutDemandesInscriptionInput
    connect?: UserWhereUniqueInput
  }

  export type FormationUpdateOneWithoutDemandesNestedInput = {
    create?: XOR<FormationCreateWithoutDemandesInput, FormationUncheckedCreateWithoutDemandesInput>
    connectOrCreate?: FormationCreateOrConnectWithoutDemandesInput
    upsert?: FormationUpsertWithoutDemandesInput
    disconnect?: FormationWhereInput | boolean
    delete?: FormationWhereInput | boolean
    connect?: FormationWhereUniqueInput
    update?: XOR<XOR<FormationUpdateToOneWithWhereWithoutDemandesInput, FormationUpdateWithoutDemandesInput>, FormationUncheckedUpdateWithoutDemandesInput>
  }

  export type UserUpdateOneWithoutDemandesInscriptionNestedInput = {
    create?: XOR<UserCreateWithoutDemandesInscriptionInput, UserUncheckedCreateWithoutDemandesInscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutDemandesInscriptionInput
    upsert?: UserUpsertWithoutDemandesInscriptionInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDemandesInscriptionInput, UserUpdateWithoutDemandesInscriptionInput>, UserUncheckedUpdateWithoutDemandesInscriptionInput>
  }

  export type UserCreateNestedOneWithoutDocumentsUploadInput = {
    create?: XOR<UserCreateWithoutDocumentsUploadInput, UserUncheckedCreateWithoutDocumentsUploadInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsUploadInput
    connect?: UserWhereUniqueInput
  }

  export type FormationCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<FormationCreateWithoutDocumentsInput, FormationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutDocumentsInput
    connect?: FormationWhereUniqueInput
  }

  export type SignatureCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SignatureCreateWithoutDocumentInput, SignatureUncheckedCreateWithoutDocumentInput> | SignatureCreateWithoutDocumentInput[] | SignatureUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutDocumentInput | SignatureCreateOrConnectWithoutDocumentInput[]
    createMany?: SignatureCreateManyDocumentInputEnvelope
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
  }

  export type SignatureUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SignatureCreateWithoutDocumentInput, SignatureUncheckedCreateWithoutDocumentInput> | SignatureCreateWithoutDocumentInput[] | SignatureUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutDocumentInput | SignatureCreateOrConnectWithoutDocumentInput[]
    createMany?: SignatureCreateManyDocumentInputEnvelope
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDocumentsUploadNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsUploadInput, UserUncheckedCreateWithoutDocumentsUploadInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsUploadInput
    upsert?: UserUpsertWithoutDocumentsUploadInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsUploadInput, UserUpdateWithoutDocumentsUploadInput>, UserUncheckedUpdateWithoutDocumentsUploadInput>
  }

  export type FormationUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<FormationCreateWithoutDocumentsInput, FormationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: FormationCreateOrConnectWithoutDocumentsInput
    upsert?: FormationUpsertWithoutDocumentsInput
    disconnect?: FormationWhereInput | boolean
    delete?: FormationWhereInput | boolean
    connect?: FormationWhereUniqueInput
    update?: XOR<XOR<FormationUpdateToOneWithWhereWithoutDocumentsInput, FormationUpdateWithoutDocumentsInput>, FormationUncheckedUpdateWithoutDocumentsInput>
  }

  export type SignatureUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SignatureCreateWithoutDocumentInput, SignatureUncheckedCreateWithoutDocumentInput> | SignatureCreateWithoutDocumentInput[] | SignatureUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutDocumentInput | SignatureCreateOrConnectWithoutDocumentInput[]
    upsert?: SignatureUpsertWithWhereUniqueWithoutDocumentInput | SignatureUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SignatureCreateManyDocumentInputEnvelope
    set?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    disconnect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    delete?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    update?: SignatureUpdateWithWhereUniqueWithoutDocumentInput | SignatureUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SignatureUpdateManyWithWhereWithoutDocumentInput | SignatureUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SignatureScalarWhereInput | SignatureScalarWhereInput[]
  }

  export type SignatureUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SignatureCreateWithoutDocumentInput, SignatureUncheckedCreateWithoutDocumentInput> | SignatureCreateWithoutDocumentInput[] | SignatureUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SignatureCreateOrConnectWithoutDocumentInput | SignatureCreateOrConnectWithoutDocumentInput[]
    upsert?: SignatureUpsertWithWhereUniqueWithoutDocumentInput | SignatureUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SignatureCreateManyDocumentInputEnvelope
    set?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    disconnect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    delete?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    connect?: SignatureWhereUniqueInput | SignatureWhereUniqueInput[]
    update?: SignatureUpdateWithWhereUniqueWithoutDocumentInput | SignatureUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SignatureUpdateManyWithWhereWithoutDocumentInput | SignatureUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SignatureScalarWhereInput | SignatureScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutSignaturesInput = {
    create?: XOR<DocumentCreateWithoutSignaturesInput, DocumentUncheckedCreateWithoutSignaturesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutSignaturesInput
    connect?: DocumentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSignaturesInput = {
    create?: XOR<UserCreateWithoutSignaturesInput, UserUncheckedCreateWithoutSignaturesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSignaturesInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutSignaturesNestedInput = {
    create?: XOR<DocumentCreateWithoutSignaturesInput, DocumentUncheckedCreateWithoutSignaturesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutSignaturesInput
    upsert?: DocumentUpsertWithoutSignaturesInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutSignaturesInput, DocumentUpdateWithoutSignaturesInput>, DocumentUncheckedUpdateWithoutSignaturesInput>
  }

  export type UserUpdateOneRequiredWithoutSignaturesNestedInput = {
    create?: XOR<UserCreateWithoutSignaturesInput, UserUncheckedCreateWithoutSignaturesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSignaturesInput
    upsert?: UserUpsertWithoutSignaturesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSignaturesInput, UserUpdateWithoutSignaturesInput>, UserUncheckedUpdateWithoutSignaturesInput>
  }

  export type UserCreateNestedOneWithoutMessagesEnvoyesInput = {
    create?: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesEnvoyesInput
    connect?: UserWhereUniqueInput
  }

  export type MessageDestinataireCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageDestinataireCreateWithoutMessageInput, MessageDestinataireUncheckedCreateWithoutMessageInput> | MessageDestinataireCreateWithoutMessageInput[] | MessageDestinataireUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutMessageInput | MessageDestinataireCreateOrConnectWithoutMessageInput[]
    createMany?: MessageDestinataireCreateManyMessageInputEnvelope
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
  }

  export type MessageDestinataireUncheckedCreateNestedManyWithoutMessageInput = {
    create?: XOR<MessageDestinataireCreateWithoutMessageInput, MessageDestinataireUncheckedCreateWithoutMessageInput> | MessageDestinataireCreateWithoutMessageInput[] | MessageDestinataireUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutMessageInput | MessageDestinataireCreateOrConnectWithoutMessageInput[]
    createMany?: MessageDestinataireCreateManyMessageInputEnvelope
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMessagesEnvoyesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesEnvoyesInput
    upsert?: UserUpsertWithoutMessagesEnvoyesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesEnvoyesInput, UserUpdateWithoutMessagesEnvoyesInput>, UserUncheckedUpdateWithoutMessagesEnvoyesInput>
  }

  export type MessageDestinataireUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageDestinataireCreateWithoutMessageInput, MessageDestinataireUncheckedCreateWithoutMessageInput> | MessageDestinataireCreateWithoutMessageInput[] | MessageDestinataireUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutMessageInput | MessageDestinataireCreateOrConnectWithoutMessageInput[]
    upsert?: MessageDestinataireUpsertWithWhereUniqueWithoutMessageInput | MessageDestinataireUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageDestinataireCreateManyMessageInputEnvelope
    set?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    disconnect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    delete?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    update?: MessageDestinataireUpdateWithWhereUniqueWithoutMessageInput | MessageDestinataireUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageDestinataireUpdateManyWithWhereWithoutMessageInput | MessageDestinataireUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageDestinataireScalarWhereInput | MessageDestinataireScalarWhereInput[]
  }

  export type MessageDestinataireUncheckedUpdateManyWithoutMessageNestedInput = {
    create?: XOR<MessageDestinataireCreateWithoutMessageInput, MessageDestinataireUncheckedCreateWithoutMessageInput> | MessageDestinataireCreateWithoutMessageInput[] | MessageDestinataireUncheckedCreateWithoutMessageInput[]
    connectOrCreate?: MessageDestinataireCreateOrConnectWithoutMessageInput | MessageDestinataireCreateOrConnectWithoutMessageInput[]
    upsert?: MessageDestinataireUpsertWithWhereUniqueWithoutMessageInput | MessageDestinataireUpsertWithWhereUniqueWithoutMessageInput[]
    createMany?: MessageDestinataireCreateManyMessageInputEnvelope
    set?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    disconnect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    delete?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    connect?: MessageDestinataireWhereUniqueInput | MessageDestinataireWhereUniqueInput[]
    update?: MessageDestinataireUpdateWithWhereUniqueWithoutMessageInput | MessageDestinataireUpdateWithWhereUniqueWithoutMessageInput[]
    updateMany?: MessageDestinataireUpdateManyWithWhereWithoutMessageInput | MessageDestinataireUpdateManyWithWhereWithoutMessageInput[]
    deleteMany?: MessageDestinataireScalarWhereInput | MessageDestinataireScalarWhereInput[]
  }

  export type MessageCreateNestedOneWithoutDestinatairesInput = {
    create?: XOR<MessageCreateWithoutDestinatairesInput, MessageUncheckedCreateWithoutDestinatairesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutDestinatairesInput
    connect?: MessageWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMessagesRecusInput = {
    create?: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesRecusInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MessageUpdateOneRequiredWithoutDestinatairesNestedInput = {
    create?: XOR<MessageCreateWithoutDestinatairesInput, MessageUncheckedCreateWithoutDestinatairesInput>
    connectOrCreate?: MessageCreateOrConnectWithoutDestinatairesInput
    upsert?: MessageUpsertWithoutDestinatairesInput
    connect?: MessageWhereUniqueInput
    update?: XOR<XOR<MessageUpdateToOneWithWhereWithoutDestinatairesInput, MessageUpdateWithoutDestinatairesInput>, MessageUncheckedUpdateWithoutDestinatairesInput>
  }

  export type UserUpdateOneRequiredWithoutMessagesRecusNestedInput = {
    create?: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesRecusInput
    upsert?: UserUpsertWithoutMessagesRecusInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessagesRecusInput, UserUpdateWithoutMessagesRecusInput>, UserUncheckedUpdateWithoutMessagesRecusInput>
  }

  export type UserCreateNestedOneWithoutCovoituragesConduitInput = {
    create?: XOR<UserCreateWithoutCovoituragesConduitInput, UserUncheckedCreateWithoutCovoituragesConduitInput>
    connectOrCreate?: UserCreateOrConnectWithoutCovoituragesConduitInput
    connect?: UserWhereUniqueInput
  }

  export type CovoituragePassagerCreateNestedManyWithoutCovoiturageInput = {
    create?: XOR<CovoituragePassagerCreateWithoutCovoiturageInput, CovoituragePassagerUncheckedCreateWithoutCovoiturageInput> | CovoituragePassagerCreateWithoutCovoiturageInput[] | CovoituragePassagerUncheckedCreateWithoutCovoiturageInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutCovoiturageInput | CovoituragePassagerCreateOrConnectWithoutCovoiturageInput[]
    createMany?: CovoituragePassagerCreateManyCovoiturageInputEnvelope
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
  }

  export type CovoituragePassagerUncheckedCreateNestedManyWithoutCovoiturageInput = {
    create?: XOR<CovoituragePassagerCreateWithoutCovoiturageInput, CovoituragePassagerUncheckedCreateWithoutCovoiturageInput> | CovoituragePassagerCreateWithoutCovoiturageInput[] | CovoituragePassagerUncheckedCreateWithoutCovoiturageInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutCovoiturageInput | CovoituragePassagerCreateOrConnectWithoutCovoiturageInput[]
    createMany?: CovoituragePassagerCreateManyCovoiturageInputEnvelope
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatutCovoiturageFieldUpdateOperationsInput = {
    set?: $Enums.StatutCovoiturage
  }

  export type UserUpdateOneRequiredWithoutCovoituragesConduitNestedInput = {
    create?: XOR<UserCreateWithoutCovoituragesConduitInput, UserUncheckedCreateWithoutCovoituragesConduitInput>
    connectOrCreate?: UserCreateOrConnectWithoutCovoituragesConduitInput
    upsert?: UserUpsertWithoutCovoituragesConduitInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCovoituragesConduitInput, UserUpdateWithoutCovoituragesConduitInput>, UserUncheckedUpdateWithoutCovoituragesConduitInput>
  }

  export type CovoituragePassagerUpdateManyWithoutCovoiturageNestedInput = {
    create?: XOR<CovoituragePassagerCreateWithoutCovoiturageInput, CovoituragePassagerUncheckedCreateWithoutCovoiturageInput> | CovoituragePassagerCreateWithoutCovoiturageInput[] | CovoituragePassagerUncheckedCreateWithoutCovoiturageInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutCovoiturageInput | CovoituragePassagerCreateOrConnectWithoutCovoiturageInput[]
    upsert?: CovoituragePassagerUpsertWithWhereUniqueWithoutCovoiturageInput | CovoituragePassagerUpsertWithWhereUniqueWithoutCovoiturageInput[]
    createMany?: CovoituragePassagerCreateManyCovoiturageInputEnvelope
    set?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    disconnect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    delete?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    update?: CovoituragePassagerUpdateWithWhereUniqueWithoutCovoiturageInput | CovoituragePassagerUpdateWithWhereUniqueWithoutCovoiturageInput[]
    updateMany?: CovoituragePassagerUpdateManyWithWhereWithoutCovoiturageInput | CovoituragePassagerUpdateManyWithWhereWithoutCovoiturageInput[]
    deleteMany?: CovoituragePassagerScalarWhereInput | CovoituragePassagerScalarWhereInput[]
  }

  export type CovoituragePassagerUncheckedUpdateManyWithoutCovoiturageNestedInput = {
    create?: XOR<CovoituragePassagerCreateWithoutCovoiturageInput, CovoituragePassagerUncheckedCreateWithoutCovoiturageInput> | CovoituragePassagerCreateWithoutCovoiturageInput[] | CovoituragePassagerUncheckedCreateWithoutCovoiturageInput[]
    connectOrCreate?: CovoituragePassagerCreateOrConnectWithoutCovoiturageInput | CovoituragePassagerCreateOrConnectWithoutCovoiturageInput[]
    upsert?: CovoituragePassagerUpsertWithWhereUniqueWithoutCovoiturageInput | CovoituragePassagerUpsertWithWhereUniqueWithoutCovoiturageInput[]
    createMany?: CovoituragePassagerCreateManyCovoiturageInputEnvelope
    set?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    disconnect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    delete?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    connect?: CovoituragePassagerWhereUniqueInput | CovoituragePassagerWhereUniqueInput[]
    update?: CovoituragePassagerUpdateWithWhereUniqueWithoutCovoiturageInput | CovoituragePassagerUpdateWithWhereUniqueWithoutCovoiturageInput[]
    updateMany?: CovoituragePassagerUpdateManyWithWhereWithoutCovoiturageInput | CovoituragePassagerUpdateManyWithWhereWithoutCovoiturageInput[]
    deleteMany?: CovoituragePassagerScalarWhereInput | CovoituragePassagerScalarWhereInput[]
  }

  export type CovoiturageCreateNestedOneWithoutPassagersInput = {
    create?: XOR<CovoiturageCreateWithoutPassagersInput, CovoiturageUncheckedCreateWithoutPassagersInput>
    connectOrCreate?: CovoiturageCreateOrConnectWithoutPassagersInput
    connect?: CovoiturageWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCovoituragesPassagerInput = {
    create?: XOR<UserCreateWithoutCovoituragesPassagerInput, UserUncheckedCreateWithoutCovoituragesPassagerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCovoituragesPassagerInput
    connect?: UserWhereUniqueInput
  }

  export type CovoiturageUpdateOneRequiredWithoutPassagersNestedInput = {
    create?: XOR<CovoiturageCreateWithoutPassagersInput, CovoiturageUncheckedCreateWithoutPassagersInput>
    connectOrCreate?: CovoiturageCreateOrConnectWithoutPassagersInput
    upsert?: CovoiturageUpsertWithoutPassagersInput
    connect?: CovoiturageWhereUniqueInput
    update?: XOR<XOR<CovoiturageUpdateToOneWithWhereWithoutPassagersInput, CovoiturageUpdateWithoutPassagersInput>, CovoiturageUncheckedUpdateWithoutPassagersInput>
  }

  export type UserUpdateOneRequiredWithoutCovoituragesPassagerNestedInput = {
    create?: XOR<UserCreateWithoutCovoituragesPassagerInput, UserUncheckedCreateWithoutCovoituragesPassagerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCovoituragesPassagerInput
    upsert?: UserUpsertWithoutCovoituragesPassagerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCovoituragesPassagerInput, UserUpdateWithoutCovoituragesPassagerInput>, UserUncheckedUpdateWithoutCovoituragesPassagerInput>
  }

  export type UserCreateNestedOneWithoutArticlesInput = {
    create?: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
    upsert?: UserUpsertWithoutArticlesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArticlesInput, UserUpdateWithoutArticlesInput>, UserUncheckedUpdateWithoutArticlesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTypeFormationFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeFormation | EnumTypeFormationFieldRefInput<$PrismaModel>
    in?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeFormationFilter<$PrismaModel> | $Enums.TypeFormation
  }

  export type NestedEnumStatutFormationFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFormation | EnumStatutFormationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFormationFilter<$PrismaModel> | $Enums.StatutFormation
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTypeFormationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TypeFormation | EnumTypeFormationFieldRefInput<$PrismaModel>
    in?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.TypeFormation[] | ListEnumTypeFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeFormationWithAggregatesFilter<$PrismaModel> | $Enums.TypeFormation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeFormationFilter<$PrismaModel>
    _max?: NestedEnumTypeFormationFilter<$PrismaModel>
  }

  export type NestedEnumStatutFormationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutFormation | EnumStatutFormationFieldRefInput<$PrismaModel>
    in?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutFormation[] | ListEnumStatutFormationFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutFormationWithAggregatesFilter<$PrismaModel> | $Enums.StatutFormation
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutFormationFilter<$PrismaModel>
    _max?: NestedEnumStatutFormationFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatutInscriptionFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutInscription | EnumStatutInscriptionFieldRefInput<$PrismaModel>
    in?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutInscriptionFilter<$PrismaModel> | $Enums.StatutInscription
  }

  export type NestedEnumStatutInscriptionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutInscription | EnumStatutInscriptionFieldRefInput<$PrismaModel>
    in?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutInscription[] | ListEnumStatutInscriptionFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutInscriptionWithAggregatesFilter<$PrismaModel> | $Enums.StatutInscription
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutInscriptionFilter<$PrismaModel>
    _max?: NestedEnumStatutInscriptionFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatutCovoiturageFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutCovoiturage | EnumStatutCovoiturageFieldRefInput<$PrismaModel>
    in?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutCovoiturageFilter<$PrismaModel> | $Enums.StatutCovoiturage
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStatutCovoiturageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatutCovoiturage | EnumStatutCovoiturageFieldRefInput<$PrismaModel>
    in?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatutCovoiturage[] | ListEnumStatutCovoiturageFieldRefInput<$PrismaModel>
    not?: NestedEnumStatutCovoiturageWithAggregatesFilter<$PrismaModel> | $Enums.StatutCovoiturage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatutCovoiturageFilter<$PrismaModel>
    _max?: NestedEnumStatutCovoiturageFilter<$PrismaModel>
  }

  export type InscriptionCreateWithoutUserInput = {
    id?: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
    formation: FormationCreateNestedOneWithoutInscriptionsInput
  }

  export type InscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    formationId: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionCreateOrConnectWithoutUserInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutUserInput, InscriptionUncheckedCreateWithoutUserInput>
  }

  export type InscriptionCreateManyUserInputEnvelope = {
    data: InscriptionCreateManyUserInput | InscriptionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutUploaderInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    public?: boolean
    createdAt?: Date | string
    formation?: FormationCreateNestedOneWithoutDocumentsInput
    signatures?: SignatureCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutUploaderInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    formationId?: string | null
    public?: boolean
    createdAt?: Date | string
    signatures?: SignatureUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutUploaderInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUploaderInput, DocumentUncheckedCreateWithoutUploaderInput>
  }

  export type DocumentCreateManyUploaderInputEnvelope = {
    data: DocumentCreateManyUploaderInput | DocumentCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type SignatureCreateWithoutUserInput = {
    id?: string
    signedAt?: Date | string
    signatureUrl?: string | null
    document: DocumentCreateNestedOneWithoutSignaturesInput
  }

  export type SignatureUncheckedCreateWithoutUserInput = {
    id?: string
    documentId: string
    signedAt?: Date | string
    signatureUrl?: string | null
  }

  export type SignatureCreateOrConnectWithoutUserInput = {
    where: SignatureWhereUniqueInput
    create: XOR<SignatureCreateWithoutUserInput, SignatureUncheckedCreateWithoutUserInput>
  }

  export type SignatureCreateManyUserInputEnvelope = {
    data: SignatureCreateManyUserInput | SignatureCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutExpediteurInput = {
    id?: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
    destinataires?: MessageDestinataireCreateNestedManyWithoutMessageInput
  }

  export type MessageUncheckedCreateWithoutExpediteurInput = {
    id?: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
    destinataires?: MessageDestinataireUncheckedCreateNestedManyWithoutMessageInput
  }

  export type MessageCreateOrConnectWithoutExpediteurInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput>
  }

  export type MessageCreateManyExpediteurInputEnvelope = {
    data: MessageCreateManyExpediteurInput | MessageCreateManyExpediteurInput[]
    skipDuplicates?: boolean
  }

  export type MessageDestinataireCreateWithoutUserInput = {
    id?: string
    lu?: boolean
    luAt?: Date | string | null
    message: MessageCreateNestedOneWithoutDestinatairesInput
  }

  export type MessageDestinataireUncheckedCreateWithoutUserInput = {
    id?: string
    messageId: string
    lu?: boolean
    luAt?: Date | string | null
  }

  export type MessageDestinataireCreateOrConnectWithoutUserInput = {
    where: MessageDestinataireWhereUniqueInput
    create: XOR<MessageDestinataireCreateWithoutUserInput, MessageDestinataireUncheckedCreateWithoutUserInput>
  }

  export type MessageDestinataireCreateManyUserInputEnvelope = {
    data: MessageDestinataireCreateManyUserInput | MessageDestinataireCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CovoiturageCreateWithoutConducteurInput = {
    id?: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
    passagers?: CovoituragePassagerCreateNestedManyWithoutCovoiturageInput
  }

  export type CovoiturageUncheckedCreateWithoutConducteurInput = {
    id?: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
    passagers?: CovoituragePassagerUncheckedCreateNestedManyWithoutCovoiturageInput
  }

  export type CovoiturageCreateOrConnectWithoutConducteurInput = {
    where: CovoiturageWhereUniqueInput
    create: XOR<CovoiturageCreateWithoutConducteurInput, CovoiturageUncheckedCreateWithoutConducteurInput>
  }

  export type CovoiturageCreateManyConducteurInputEnvelope = {
    data: CovoiturageCreateManyConducteurInput | CovoiturageCreateManyConducteurInput[]
    skipDuplicates?: boolean
  }

  export type CovoituragePassagerCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    covoiturage: CovoiturageCreateNestedOneWithoutPassagersInput
  }

  export type CovoituragePassagerUncheckedCreateWithoutUserInput = {
    id?: string
    covoiturageId: string
    createdAt?: Date | string
  }

  export type CovoituragePassagerCreateOrConnectWithoutUserInput = {
    where: CovoituragePassagerWhereUniqueInput
    create: XOR<CovoituragePassagerCreateWithoutUserInput, CovoituragePassagerUncheckedCreateWithoutUserInput>
  }

  export type CovoituragePassagerCreateManyUserInputEnvelope = {
    data: CovoituragePassagerCreateManyUserInput | CovoituragePassagerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ArticleCreateWithoutAuteurInput = {
    id?: string
    titre: string
    contenu: string
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUncheckedCreateWithoutAuteurInput = {
    id?: string
    titre: string
    contenu: string
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCreateOrConnectWithoutAuteurInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutAuteurInput, ArticleUncheckedCreateWithoutAuteurInput>
  }

  export type ArticleCreateManyAuteurInputEnvelope = {
    data: ArticleCreateManyAuteurInput | ArticleCreateManyAuteurInput[]
    skipDuplicates?: boolean
  }

  export type DemandeInscriptionCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
    formation?: FormationCreateNestedOneWithoutDemandesInput
  }

  export type DemandeInscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    formationId?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemandeInscriptionCreateOrConnectWithoutUserInput = {
    where: DemandeInscriptionWhereUniqueInput
    create: XOR<DemandeInscriptionCreateWithoutUserInput, DemandeInscriptionUncheckedCreateWithoutUserInput>
  }

  export type DemandeInscriptionCreateManyUserInputEnvelope = {
    data: DemandeInscriptionCreateManyUserInput | DemandeInscriptionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: InscriptionWhereUniqueInput
    update: XOR<InscriptionUpdateWithoutUserInput, InscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<InscriptionCreateWithoutUserInput, InscriptionUncheckedCreateWithoutUserInput>
  }

  export type InscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: InscriptionWhereUniqueInput
    data: XOR<InscriptionUpdateWithoutUserInput, InscriptionUncheckedUpdateWithoutUserInput>
  }

  export type InscriptionUpdateManyWithWhereWithoutUserInput = {
    where: InscriptionScalarWhereInput
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyWithoutUserInput>
  }

  export type InscriptionScalarWhereInput = {
    AND?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
    OR?: InscriptionScalarWhereInput[]
    NOT?: InscriptionScalarWhereInput | InscriptionScalarWhereInput[]
    id?: StringFilter<"Inscription"> | string
    userId?: StringFilter<"Inscription"> | string
    formationId?: StringFilter<"Inscription"> | string
    statut?: EnumStatutInscriptionFilter<"Inscription"> | $Enums.StatutInscription
    createdAt?: DateTimeFilter<"Inscription"> | Date | string
    updatedAt?: DateTimeFilter<"Inscription"> | Date | string
  }

  export type DocumentUpsertWithWhereUniqueWithoutUploaderInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutUploaderInput, DocumentUncheckedUpdateWithoutUploaderInput>
    create: XOR<DocumentCreateWithoutUploaderInput, DocumentUncheckedCreateWithoutUploaderInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutUploaderInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutUploaderInput, DocumentUncheckedUpdateWithoutUploaderInput>
  }

  export type DocumentUpdateManyWithWhereWithoutUploaderInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutUploaderInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    nom?: StringFilter<"Document"> | string
    url?: StringFilter<"Document"> | string
    taille?: IntNullableFilter<"Document"> | number | null
    mimeType?: StringNullableFilter<"Document"> | string | null
    uploaderId?: StringFilter<"Document"> | string
    formationId?: StringNullableFilter<"Document"> | string | null
    public?: BoolFilter<"Document"> | boolean
    createdAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type SignatureUpsertWithWhereUniqueWithoutUserInput = {
    where: SignatureWhereUniqueInput
    update: XOR<SignatureUpdateWithoutUserInput, SignatureUncheckedUpdateWithoutUserInput>
    create: XOR<SignatureCreateWithoutUserInput, SignatureUncheckedCreateWithoutUserInput>
  }

  export type SignatureUpdateWithWhereUniqueWithoutUserInput = {
    where: SignatureWhereUniqueInput
    data: XOR<SignatureUpdateWithoutUserInput, SignatureUncheckedUpdateWithoutUserInput>
  }

  export type SignatureUpdateManyWithWhereWithoutUserInput = {
    where: SignatureScalarWhereInput
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyWithoutUserInput>
  }

  export type SignatureScalarWhereInput = {
    AND?: SignatureScalarWhereInput | SignatureScalarWhereInput[]
    OR?: SignatureScalarWhereInput[]
    NOT?: SignatureScalarWhereInput | SignatureScalarWhereInput[]
    id?: StringFilter<"Signature"> | string
    documentId?: StringFilter<"Signature"> | string
    userId?: StringFilter<"Signature"> | string
    signedAt?: DateTimeFilter<"Signature"> | Date | string
    signatureUrl?: StringNullableFilter<"Signature"> | string | null
  }

  export type MessageUpsertWithWhereUniqueWithoutExpediteurInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutExpediteurInput, MessageUncheckedUpdateWithoutExpediteurInput>
    create: XOR<MessageCreateWithoutExpediteurInput, MessageUncheckedCreateWithoutExpediteurInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutExpediteurInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutExpediteurInput, MessageUncheckedUpdateWithoutExpediteurInput>
  }

  export type MessageUpdateManyWithWhereWithoutExpediteurInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutExpediteurInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    expediteurId?: StringFilter<"Message"> | string
    sujet?: StringNullableFilter<"Message"> | string | null
    contenu?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageDestinataireUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageDestinataireWhereUniqueInput
    update: XOR<MessageDestinataireUpdateWithoutUserInput, MessageDestinataireUncheckedUpdateWithoutUserInput>
    create: XOR<MessageDestinataireCreateWithoutUserInput, MessageDestinataireUncheckedCreateWithoutUserInput>
  }

  export type MessageDestinataireUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageDestinataireWhereUniqueInput
    data: XOR<MessageDestinataireUpdateWithoutUserInput, MessageDestinataireUncheckedUpdateWithoutUserInput>
  }

  export type MessageDestinataireUpdateManyWithWhereWithoutUserInput = {
    where: MessageDestinataireScalarWhereInput
    data: XOR<MessageDestinataireUpdateManyMutationInput, MessageDestinataireUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageDestinataireScalarWhereInput = {
    AND?: MessageDestinataireScalarWhereInput | MessageDestinataireScalarWhereInput[]
    OR?: MessageDestinataireScalarWhereInput[]
    NOT?: MessageDestinataireScalarWhereInput | MessageDestinataireScalarWhereInput[]
    id?: StringFilter<"MessageDestinataire"> | string
    messageId?: StringFilter<"MessageDestinataire"> | string
    userId?: StringFilter<"MessageDestinataire"> | string
    lu?: BoolFilter<"MessageDestinataire"> | boolean
    luAt?: DateTimeNullableFilter<"MessageDestinataire"> | Date | string | null
  }

  export type CovoiturageUpsertWithWhereUniqueWithoutConducteurInput = {
    where: CovoiturageWhereUniqueInput
    update: XOR<CovoiturageUpdateWithoutConducteurInput, CovoiturageUncheckedUpdateWithoutConducteurInput>
    create: XOR<CovoiturageCreateWithoutConducteurInput, CovoiturageUncheckedCreateWithoutConducteurInput>
  }

  export type CovoiturageUpdateWithWhereUniqueWithoutConducteurInput = {
    where: CovoiturageWhereUniqueInput
    data: XOR<CovoiturageUpdateWithoutConducteurInput, CovoiturageUncheckedUpdateWithoutConducteurInput>
  }

  export type CovoiturageUpdateManyWithWhereWithoutConducteurInput = {
    where: CovoiturageScalarWhereInput
    data: XOR<CovoiturageUpdateManyMutationInput, CovoiturageUncheckedUpdateManyWithoutConducteurInput>
  }

  export type CovoiturageScalarWhereInput = {
    AND?: CovoiturageScalarWhereInput | CovoiturageScalarWhereInput[]
    OR?: CovoiturageScalarWhereInput[]
    NOT?: CovoiturageScalarWhereInput | CovoiturageScalarWhereInput[]
    id?: StringFilter<"Covoiturage"> | string
    conducteurId?: StringFilter<"Covoiturage"> | string
    depart?: StringFilter<"Covoiturage"> | string
    destination?: StringFilter<"Covoiturage"> | string
    dateDepart?: DateTimeFilter<"Covoiturage"> | Date | string
    places?: IntFilter<"Covoiturage"> | number
    statut?: EnumStatutCovoiturageFilter<"Covoiturage"> | $Enums.StatutCovoiturage
    commentaire?: StringNullableFilter<"Covoiturage"> | string | null
    createdAt?: DateTimeFilter<"Covoiturage"> | Date | string
  }

  export type CovoituragePassagerUpsertWithWhereUniqueWithoutUserInput = {
    where: CovoituragePassagerWhereUniqueInput
    update: XOR<CovoituragePassagerUpdateWithoutUserInput, CovoituragePassagerUncheckedUpdateWithoutUserInput>
    create: XOR<CovoituragePassagerCreateWithoutUserInput, CovoituragePassagerUncheckedCreateWithoutUserInput>
  }

  export type CovoituragePassagerUpdateWithWhereUniqueWithoutUserInput = {
    where: CovoituragePassagerWhereUniqueInput
    data: XOR<CovoituragePassagerUpdateWithoutUserInput, CovoituragePassagerUncheckedUpdateWithoutUserInput>
  }

  export type CovoituragePassagerUpdateManyWithWhereWithoutUserInput = {
    where: CovoituragePassagerScalarWhereInput
    data: XOR<CovoituragePassagerUpdateManyMutationInput, CovoituragePassagerUncheckedUpdateManyWithoutUserInput>
  }

  export type CovoituragePassagerScalarWhereInput = {
    AND?: CovoituragePassagerScalarWhereInput | CovoituragePassagerScalarWhereInput[]
    OR?: CovoituragePassagerScalarWhereInput[]
    NOT?: CovoituragePassagerScalarWhereInput | CovoituragePassagerScalarWhereInput[]
    id?: StringFilter<"CovoituragePassager"> | string
    covoiturageId?: StringFilter<"CovoituragePassager"> | string
    userId?: StringFilter<"CovoituragePassager"> | string
    createdAt?: DateTimeFilter<"CovoituragePassager"> | Date | string
  }

  export type ArticleUpsertWithWhereUniqueWithoutAuteurInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutAuteurInput, ArticleUncheckedUpdateWithoutAuteurInput>
    create: XOR<ArticleCreateWithoutAuteurInput, ArticleUncheckedCreateWithoutAuteurInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutAuteurInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutAuteurInput, ArticleUncheckedUpdateWithoutAuteurInput>
  }

  export type ArticleUpdateManyWithWhereWithoutAuteurInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutAuteurInput>
  }

  export type ArticleScalarWhereInput = {
    AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    OR?: ArticleScalarWhereInput[]
    NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    id?: StringFilter<"Article"> | string
    titre?: StringFilter<"Article"> | string
    contenu?: StringFilter<"Article"> | string
    publie?: BoolFilter<"Article"> | boolean
    auteurId?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }

  export type DemandeInscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: DemandeInscriptionWhereUniqueInput
    update: XOR<DemandeInscriptionUpdateWithoutUserInput, DemandeInscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<DemandeInscriptionCreateWithoutUserInput, DemandeInscriptionUncheckedCreateWithoutUserInput>
  }

  export type DemandeInscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: DemandeInscriptionWhereUniqueInput
    data: XOR<DemandeInscriptionUpdateWithoutUserInput, DemandeInscriptionUncheckedUpdateWithoutUserInput>
  }

  export type DemandeInscriptionUpdateManyWithWhereWithoutUserInput = {
    where: DemandeInscriptionScalarWhereInput
    data: XOR<DemandeInscriptionUpdateManyMutationInput, DemandeInscriptionUncheckedUpdateManyWithoutUserInput>
  }

  export type DemandeInscriptionScalarWhereInput = {
    AND?: DemandeInscriptionScalarWhereInput | DemandeInscriptionScalarWhereInput[]
    OR?: DemandeInscriptionScalarWhereInput[]
    NOT?: DemandeInscriptionScalarWhereInput | DemandeInscriptionScalarWhereInput[]
    id?: StringFilter<"DemandeInscription"> | string
    nom?: StringFilter<"DemandeInscription"> | string
    prenom?: StringFilter<"DemandeInscription"> | string
    email?: StringFilter<"DemandeInscription"> | string
    telephone?: StringNullableFilter<"DemandeInscription"> | string | null
    message?: StringNullableFilter<"DemandeInscription"> | string | null
    formationId?: StringNullableFilter<"DemandeInscription"> | string | null
    userId?: StringNullableFilter<"DemandeInscription"> | string | null
    statut?: EnumStatutInscriptionFilter<"DemandeInscription"> | $Enums.StatutInscription
    createdAt?: DateTimeFilter<"DemandeInscription"> | Date | string
    updatedAt?: DateTimeFilter<"DemandeInscription"> | Date | string
  }

  export type SessionCreateWithoutFormationInput = {
    id?: string
    dateDebut: Date | string
    dateFin: Date | string
    lieu?: string | null
    lienVisio?: string | null
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutFormationInput = {
    id?: string
    dateDebut: Date | string
    dateFin: Date | string
    lieu?: string | null
    lienVisio?: string | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutFormationInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutFormationInput, SessionUncheckedCreateWithoutFormationInput>
  }

  export type SessionCreateManyFormationInputEnvelope = {
    data: SessionCreateManyFormationInput | SessionCreateManyFormationInput[]
    skipDuplicates?: boolean
  }

  export type InscriptionCreateWithoutFormationInput = {
    id?: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInscriptionsInput
  }

  export type InscriptionUncheckedCreateWithoutFormationInput = {
    id?: string
    userId: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionCreateOrConnectWithoutFormationInput = {
    where: InscriptionWhereUniqueInput
    create: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput>
  }

  export type InscriptionCreateManyFormationInputEnvelope = {
    data: InscriptionCreateManyFormationInput | InscriptionCreateManyFormationInput[]
    skipDuplicates?: boolean
  }

  export type DemandeInscriptionCreateWithoutFormationInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutDemandesInscriptionInput
  }

  export type DemandeInscriptionUncheckedCreateWithoutFormationInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    userId?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemandeInscriptionCreateOrConnectWithoutFormationInput = {
    where: DemandeInscriptionWhereUniqueInput
    create: XOR<DemandeInscriptionCreateWithoutFormationInput, DemandeInscriptionUncheckedCreateWithoutFormationInput>
  }

  export type DemandeInscriptionCreateManyFormationInputEnvelope = {
    data: DemandeInscriptionCreateManyFormationInput | DemandeInscriptionCreateManyFormationInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutFormationInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    public?: boolean
    createdAt?: Date | string
    uploader: UserCreateNestedOneWithoutDocumentsUploadInput
    signatures?: SignatureCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutFormationInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    uploaderId: string
    public?: boolean
    createdAt?: Date | string
    signatures?: SignatureUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutFormationInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutFormationInput, DocumentUncheckedCreateWithoutFormationInput>
  }

  export type DocumentCreateManyFormationInputEnvelope = {
    data: DocumentCreateManyFormationInput | DocumentCreateManyFormationInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutFormationInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutFormationInput, SessionUncheckedUpdateWithoutFormationInput>
    create: XOR<SessionCreateWithoutFormationInput, SessionUncheckedCreateWithoutFormationInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutFormationInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutFormationInput, SessionUncheckedUpdateWithoutFormationInput>
  }

  export type SessionUpdateManyWithWhereWithoutFormationInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutFormationInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    formationId?: StringFilter<"Session"> | string
    dateDebut?: DateTimeFilter<"Session"> | Date | string
    dateFin?: DateTimeFilter<"Session"> | Date | string
    lieu?: StringNullableFilter<"Session"> | string | null
    lienVisio?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type InscriptionUpsertWithWhereUniqueWithoutFormationInput = {
    where: InscriptionWhereUniqueInput
    update: XOR<InscriptionUpdateWithoutFormationInput, InscriptionUncheckedUpdateWithoutFormationInput>
    create: XOR<InscriptionCreateWithoutFormationInput, InscriptionUncheckedCreateWithoutFormationInput>
  }

  export type InscriptionUpdateWithWhereUniqueWithoutFormationInput = {
    where: InscriptionWhereUniqueInput
    data: XOR<InscriptionUpdateWithoutFormationInput, InscriptionUncheckedUpdateWithoutFormationInput>
  }

  export type InscriptionUpdateManyWithWhereWithoutFormationInput = {
    where: InscriptionScalarWhereInput
    data: XOR<InscriptionUpdateManyMutationInput, InscriptionUncheckedUpdateManyWithoutFormationInput>
  }

  export type DemandeInscriptionUpsertWithWhereUniqueWithoutFormationInput = {
    where: DemandeInscriptionWhereUniqueInput
    update: XOR<DemandeInscriptionUpdateWithoutFormationInput, DemandeInscriptionUncheckedUpdateWithoutFormationInput>
    create: XOR<DemandeInscriptionCreateWithoutFormationInput, DemandeInscriptionUncheckedCreateWithoutFormationInput>
  }

  export type DemandeInscriptionUpdateWithWhereUniqueWithoutFormationInput = {
    where: DemandeInscriptionWhereUniqueInput
    data: XOR<DemandeInscriptionUpdateWithoutFormationInput, DemandeInscriptionUncheckedUpdateWithoutFormationInput>
  }

  export type DemandeInscriptionUpdateManyWithWhereWithoutFormationInput = {
    where: DemandeInscriptionScalarWhereInput
    data: XOR<DemandeInscriptionUpdateManyMutationInput, DemandeInscriptionUncheckedUpdateManyWithoutFormationInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutFormationInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutFormationInput, DocumentUncheckedUpdateWithoutFormationInput>
    create: XOR<DocumentCreateWithoutFormationInput, DocumentUncheckedCreateWithoutFormationInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutFormationInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutFormationInput, DocumentUncheckedUpdateWithoutFormationInput>
  }

  export type DocumentUpdateManyWithWhereWithoutFormationInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutFormationInput>
  }

  export type FormationCreateWithoutSessionsInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionCreateNestedManyWithoutFormationInput
    documents?: DocumentCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateWithoutSessionsInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionUncheckedCreateNestedManyWithoutFormationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationCreateOrConnectWithoutSessionsInput = {
    where: FormationWhereUniqueInput
    create: XOR<FormationCreateWithoutSessionsInput, FormationUncheckedCreateWithoutSessionsInput>
  }

  export type FormationUpsertWithoutSessionsInput = {
    update: XOR<FormationUpdateWithoutSessionsInput, FormationUncheckedUpdateWithoutSessionsInput>
    create: XOR<FormationCreateWithoutSessionsInput, FormationUncheckedCreateWithoutSessionsInput>
    where?: FormationWhereInput
  }

  export type FormationUpdateToOneWithWhereWithoutSessionsInput = {
    where?: FormationWhereInput
    data: XOR<FormationUpdateWithoutSessionsInput, FormationUncheckedUpdateWithoutSessionsInput>
  }

  export type FormationUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUpdateManyWithoutFormationNestedInput
    documents?: DocumentUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUncheckedUpdateManyWithoutFormationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type UserCreateWithoutInscriptionsInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInscriptionsInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInscriptionsInput, UserUncheckedCreateWithoutInscriptionsInput>
  }

  export type FormationCreateWithoutInscriptionsInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionCreateNestedManyWithoutFormationInput
    documents?: DocumentCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateWithoutInscriptionsInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionUncheckedCreateNestedManyWithoutFormationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationCreateOrConnectWithoutInscriptionsInput = {
    where: FormationWhereUniqueInput
    create: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
  }

  export type UserUpsertWithoutInscriptionsInput = {
    update: XOR<UserUpdateWithoutInscriptionsInput, UserUncheckedUpdateWithoutInscriptionsInput>
    create: XOR<UserCreateWithoutInscriptionsInput, UserUncheckedCreateWithoutInscriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInscriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInscriptionsInput, UserUncheckedUpdateWithoutInscriptionsInput>
  }

  export type UserUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FormationUpsertWithoutInscriptionsInput = {
    update: XOR<FormationUpdateWithoutInscriptionsInput, FormationUncheckedUpdateWithoutInscriptionsInput>
    create: XOR<FormationCreateWithoutInscriptionsInput, FormationUncheckedCreateWithoutInscriptionsInput>
    where?: FormationWhereInput
  }

  export type FormationUpdateToOneWithWhereWithoutInscriptionsInput = {
    where?: FormationWhereInput
    data: XOR<FormationUpdateWithoutInscriptionsInput, FormationUncheckedUpdateWithoutInscriptionsInput>
  }

  export type FormationUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUpdateManyWithoutFormationNestedInput
    documents?: DocumentUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateWithoutInscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUncheckedUpdateManyWithoutFormationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type FormationCreateWithoutDemandesInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutFormationInput
    inscriptions?: InscriptionCreateNestedManyWithoutFormationInput
    documents?: DocumentCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateWithoutDemandesInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutFormationInput
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutFormationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationCreateOrConnectWithoutDemandesInput = {
    where: FormationWhereUniqueInput
    create: XOR<FormationCreateWithoutDemandesInput, FormationUncheckedCreateWithoutDemandesInput>
  }

  export type UserCreateWithoutDemandesInscriptionInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
  }

  export type UserUncheckedCreateWithoutDemandesInscriptionInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
  }

  export type UserCreateOrConnectWithoutDemandesInscriptionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDemandesInscriptionInput, UserUncheckedCreateWithoutDemandesInscriptionInput>
  }

  export type FormationUpsertWithoutDemandesInput = {
    update: XOR<FormationUpdateWithoutDemandesInput, FormationUncheckedUpdateWithoutDemandesInput>
    create: XOR<FormationCreateWithoutDemandesInput, FormationUncheckedCreateWithoutDemandesInput>
    where?: FormationWhereInput
  }

  export type FormationUpdateToOneWithWhereWithoutDemandesInput = {
    where?: FormationWhereInput
    data: XOR<FormationUpdateWithoutDemandesInput, FormationUncheckedUpdateWithoutDemandesInput>
  }

  export type FormationUpdateWithoutDemandesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutFormationNestedInput
    inscriptions?: InscriptionUpdateManyWithoutFormationNestedInput
    documents?: DocumentUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateWithoutDemandesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutFormationNestedInput
    inscriptions?: InscriptionUncheckedUpdateManyWithoutFormationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type UserUpsertWithoutDemandesInscriptionInput = {
    update: XOR<UserUpdateWithoutDemandesInscriptionInput, UserUncheckedUpdateWithoutDemandesInscriptionInput>
    create: XOR<UserCreateWithoutDemandesInscriptionInput, UserUncheckedCreateWithoutDemandesInscriptionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDemandesInscriptionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDemandesInscriptionInput, UserUncheckedUpdateWithoutDemandesInscriptionInput>
  }

  export type UserUpdateWithoutDemandesInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
  }

  export type UserUncheckedUpdateWithoutDemandesInscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
  }

  export type UserCreateWithoutDocumentsUploadInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentsUploadInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentsUploadInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsUploadInput, UserUncheckedCreateWithoutDocumentsUploadInput>
  }

  export type FormationCreateWithoutDocumentsInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutFormationInput
    inscriptions?: InscriptionCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionCreateNestedManyWithoutFormationInput
  }

  export type FormationUncheckedCreateWithoutDocumentsInput = {
    id?: string
    titre: string
    description?: string | null
    type: $Enums.TypeFormation
    statut?: $Enums.StatutFormation
    dureeHeures?: number | null
    prix?: number | null
    places?: number | null
    lienVisio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutFormationInput
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutFormationInput
    demandes?: DemandeInscriptionUncheckedCreateNestedManyWithoutFormationInput
  }

  export type FormationCreateOrConnectWithoutDocumentsInput = {
    where: FormationWhereUniqueInput
    create: XOR<FormationCreateWithoutDocumentsInput, FormationUncheckedCreateWithoutDocumentsInput>
  }

  export type SignatureCreateWithoutDocumentInput = {
    id?: string
    signedAt?: Date | string
    signatureUrl?: string | null
    user: UserCreateNestedOneWithoutSignaturesInput
  }

  export type SignatureUncheckedCreateWithoutDocumentInput = {
    id?: string
    userId: string
    signedAt?: Date | string
    signatureUrl?: string | null
  }

  export type SignatureCreateOrConnectWithoutDocumentInput = {
    where: SignatureWhereUniqueInput
    create: XOR<SignatureCreateWithoutDocumentInput, SignatureUncheckedCreateWithoutDocumentInput>
  }

  export type SignatureCreateManyDocumentInputEnvelope = {
    data: SignatureCreateManyDocumentInput | SignatureCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDocumentsUploadInput = {
    update: XOR<UserUpdateWithoutDocumentsUploadInput, UserUncheckedUpdateWithoutDocumentsUploadInput>
    create: XOR<UserCreateWithoutDocumentsUploadInput, UserUncheckedCreateWithoutDocumentsUploadInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsUploadInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsUploadInput, UserUncheckedUpdateWithoutDocumentsUploadInput>
  }

  export type UserUpdateWithoutDocumentsUploadInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsUploadInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FormationUpsertWithoutDocumentsInput = {
    update: XOR<FormationUpdateWithoutDocumentsInput, FormationUncheckedUpdateWithoutDocumentsInput>
    create: XOR<FormationCreateWithoutDocumentsInput, FormationUncheckedCreateWithoutDocumentsInput>
    where?: FormationWhereInput
  }

  export type FormationUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: FormationWhereInput
    data: XOR<FormationUpdateWithoutDocumentsInput, FormationUncheckedUpdateWithoutDocumentsInput>
  }

  export type FormationUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutFormationNestedInput
    inscriptions?: InscriptionUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUpdateManyWithoutFormationNestedInput
  }

  export type FormationUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTypeFormationFieldUpdateOperationsInput | $Enums.TypeFormation
    statut?: EnumStatutFormationFieldUpdateOperationsInput | $Enums.StatutFormation
    dureeHeures?: NullableIntFieldUpdateOperationsInput | number | null
    prix?: NullableFloatFieldUpdateOperationsInput | number | null
    places?: NullableIntFieldUpdateOperationsInput | number | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutFormationNestedInput
    inscriptions?: InscriptionUncheckedUpdateManyWithoutFormationNestedInput
    demandes?: DemandeInscriptionUncheckedUpdateManyWithoutFormationNestedInput
  }

  export type SignatureUpsertWithWhereUniqueWithoutDocumentInput = {
    where: SignatureWhereUniqueInput
    update: XOR<SignatureUpdateWithoutDocumentInput, SignatureUncheckedUpdateWithoutDocumentInput>
    create: XOR<SignatureCreateWithoutDocumentInput, SignatureUncheckedCreateWithoutDocumentInput>
  }

  export type SignatureUpdateWithWhereUniqueWithoutDocumentInput = {
    where: SignatureWhereUniqueInput
    data: XOR<SignatureUpdateWithoutDocumentInput, SignatureUncheckedUpdateWithoutDocumentInput>
  }

  export type SignatureUpdateManyWithWhereWithoutDocumentInput = {
    where: SignatureScalarWhereInput
    data: XOR<SignatureUpdateManyMutationInput, SignatureUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentCreateWithoutSignaturesInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    public?: boolean
    createdAt?: Date | string
    uploader: UserCreateNestedOneWithoutDocumentsUploadInput
    formation?: FormationCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutSignaturesInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    uploaderId: string
    formationId?: string | null
    public?: boolean
    createdAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutSignaturesInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutSignaturesInput, DocumentUncheckedCreateWithoutSignaturesInput>
  }

  export type UserCreateWithoutSignaturesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSignaturesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSignaturesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSignaturesInput, UserUncheckedCreateWithoutSignaturesInput>
  }

  export type DocumentUpsertWithoutSignaturesInput = {
    update: XOR<DocumentUpdateWithoutSignaturesInput, DocumentUncheckedUpdateWithoutSignaturesInput>
    create: XOR<DocumentCreateWithoutSignaturesInput, DocumentUncheckedCreateWithoutSignaturesInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutSignaturesInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutSignaturesInput, DocumentUncheckedUpdateWithoutSignaturesInput>
  }

  export type DocumentUpdateWithoutSignaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: UserUpdateOneRequiredWithoutDocumentsUploadNestedInput
    formation?: FormationUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutSignaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploaderId?: StringFieldUpdateOperationsInput | string
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSignaturesInput = {
    update: XOR<UserUpdateWithoutSignaturesInput, UserUncheckedUpdateWithoutSignaturesInput>
    create: XOR<UserCreateWithoutSignaturesInput, UserUncheckedCreateWithoutSignaturesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSignaturesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSignaturesInput, UserUncheckedUpdateWithoutSignaturesInput>
  }

  export type UserUpdateWithoutSignaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSignaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMessagesEnvoyesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesEnvoyesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesEnvoyesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
  }

  export type MessageDestinataireCreateWithoutMessageInput = {
    id?: string
    lu?: boolean
    luAt?: Date | string | null
    user: UserCreateNestedOneWithoutMessagesRecusInput
  }

  export type MessageDestinataireUncheckedCreateWithoutMessageInput = {
    id?: string
    userId: string
    lu?: boolean
    luAt?: Date | string | null
  }

  export type MessageDestinataireCreateOrConnectWithoutMessageInput = {
    where: MessageDestinataireWhereUniqueInput
    create: XOR<MessageDestinataireCreateWithoutMessageInput, MessageDestinataireUncheckedCreateWithoutMessageInput>
  }

  export type MessageDestinataireCreateManyMessageInputEnvelope = {
    data: MessageDestinataireCreateManyMessageInput | MessageDestinataireCreateManyMessageInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMessagesEnvoyesInput = {
    update: XOR<UserUpdateWithoutMessagesEnvoyesInput, UserUncheckedUpdateWithoutMessagesEnvoyesInput>
    create: XOR<UserCreateWithoutMessagesEnvoyesInput, UserUncheckedCreateWithoutMessagesEnvoyesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesEnvoyesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesEnvoyesInput, UserUncheckedUpdateWithoutMessagesEnvoyesInput>
  }

  export type UserUpdateWithoutMessagesEnvoyesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesEnvoyesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageDestinataireUpsertWithWhereUniqueWithoutMessageInput = {
    where: MessageDestinataireWhereUniqueInput
    update: XOR<MessageDestinataireUpdateWithoutMessageInput, MessageDestinataireUncheckedUpdateWithoutMessageInput>
    create: XOR<MessageDestinataireCreateWithoutMessageInput, MessageDestinataireUncheckedCreateWithoutMessageInput>
  }

  export type MessageDestinataireUpdateWithWhereUniqueWithoutMessageInput = {
    where: MessageDestinataireWhereUniqueInput
    data: XOR<MessageDestinataireUpdateWithoutMessageInput, MessageDestinataireUncheckedUpdateWithoutMessageInput>
  }

  export type MessageDestinataireUpdateManyWithWhereWithoutMessageInput = {
    where: MessageDestinataireScalarWhereInput
    data: XOR<MessageDestinataireUpdateManyMutationInput, MessageDestinataireUncheckedUpdateManyWithoutMessageInput>
  }

  export type MessageCreateWithoutDestinatairesInput = {
    id?: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
    expediteur: UserCreateNestedOneWithoutMessagesEnvoyesInput
  }

  export type MessageUncheckedCreateWithoutDestinatairesInput = {
    id?: string
    expediteurId: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutDestinatairesInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutDestinatairesInput, MessageUncheckedCreateWithoutDestinatairesInput>
  }

  export type UserCreateWithoutMessagesRecusInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesRecusInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesRecusInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
  }

  export type MessageUpsertWithoutDestinatairesInput = {
    update: XOR<MessageUpdateWithoutDestinatairesInput, MessageUncheckedUpdateWithoutDestinatairesInput>
    create: XOR<MessageCreateWithoutDestinatairesInput, MessageUncheckedCreateWithoutDestinatairesInput>
    where?: MessageWhereInput
  }

  export type MessageUpdateToOneWithWhereWithoutDestinatairesInput = {
    where?: MessageWhereInput
    data: XOR<MessageUpdateWithoutDestinatairesInput, MessageUncheckedUpdateWithoutDestinatairesInput>
  }

  export type MessageUpdateWithoutDestinatairesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expediteur?: UserUpdateOneRequiredWithoutMessagesEnvoyesNestedInput
  }

  export type MessageUncheckedUpdateWithoutDestinatairesInput = {
    id?: StringFieldUpdateOperationsInput | string
    expediteurId?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutMessagesRecusInput = {
    update: XOR<UserUpdateWithoutMessagesRecusInput, UserUncheckedUpdateWithoutMessagesRecusInput>
    create: XOR<UserCreateWithoutMessagesRecusInput, UserUncheckedCreateWithoutMessagesRecusInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessagesRecusInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessagesRecusInput, UserUncheckedUpdateWithoutMessagesRecusInput>
  }

  export type UserUpdateWithoutMessagesRecusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesRecusInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCovoituragesConduitInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCovoituragesConduitInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCovoituragesConduitInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCovoituragesConduitInput, UserUncheckedCreateWithoutCovoituragesConduitInput>
  }

  export type CovoituragePassagerCreateWithoutCovoiturageInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCovoituragesPassagerInput
  }

  export type CovoituragePassagerUncheckedCreateWithoutCovoiturageInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type CovoituragePassagerCreateOrConnectWithoutCovoiturageInput = {
    where: CovoituragePassagerWhereUniqueInput
    create: XOR<CovoituragePassagerCreateWithoutCovoiturageInput, CovoituragePassagerUncheckedCreateWithoutCovoiturageInput>
  }

  export type CovoituragePassagerCreateManyCovoiturageInputEnvelope = {
    data: CovoituragePassagerCreateManyCovoiturageInput | CovoituragePassagerCreateManyCovoiturageInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCovoituragesConduitInput = {
    update: XOR<UserUpdateWithoutCovoituragesConduitInput, UserUncheckedUpdateWithoutCovoituragesConduitInput>
    create: XOR<UserCreateWithoutCovoituragesConduitInput, UserUncheckedCreateWithoutCovoituragesConduitInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCovoituragesConduitInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCovoituragesConduitInput, UserUncheckedUpdateWithoutCovoituragesConduitInput>
  }

  export type UserUpdateWithoutCovoituragesConduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCovoituragesConduitInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CovoituragePassagerUpsertWithWhereUniqueWithoutCovoiturageInput = {
    where: CovoituragePassagerWhereUniqueInput
    update: XOR<CovoituragePassagerUpdateWithoutCovoiturageInput, CovoituragePassagerUncheckedUpdateWithoutCovoiturageInput>
    create: XOR<CovoituragePassagerCreateWithoutCovoiturageInput, CovoituragePassagerUncheckedCreateWithoutCovoiturageInput>
  }

  export type CovoituragePassagerUpdateWithWhereUniqueWithoutCovoiturageInput = {
    where: CovoituragePassagerWhereUniqueInput
    data: XOR<CovoituragePassagerUpdateWithoutCovoiturageInput, CovoituragePassagerUncheckedUpdateWithoutCovoiturageInput>
  }

  export type CovoituragePassagerUpdateManyWithWhereWithoutCovoiturageInput = {
    where: CovoituragePassagerScalarWhereInput
    data: XOR<CovoituragePassagerUpdateManyMutationInput, CovoituragePassagerUncheckedUpdateManyWithoutCovoiturageInput>
  }

  export type CovoiturageCreateWithoutPassagersInput = {
    id?: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
    conducteur: UserCreateNestedOneWithoutCovoituragesConduitInput
  }

  export type CovoiturageUncheckedCreateWithoutPassagersInput = {
    id?: string
    conducteurId: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
  }

  export type CovoiturageCreateOrConnectWithoutPassagersInput = {
    where: CovoiturageWhereUniqueInput
    create: XOR<CovoiturageCreateWithoutPassagersInput, CovoiturageUncheckedCreateWithoutPassagersInput>
  }

  export type UserCreateWithoutCovoituragesPassagerInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    articles?: ArticleCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCovoituragesPassagerInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuteurInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCovoituragesPassagerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCovoituragesPassagerInput, UserUncheckedCreateWithoutCovoituragesPassagerInput>
  }

  export type CovoiturageUpsertWithoutPassagersInput = {
    update: XOR<CovoiturageUpdateWithoutPassagersInput, CovoiturageUncheckedUpdateWithoutPassagersInput>
    create: XOR<CovoiturageCreateWithoutPassagersInput, CovoiturageUncheckedCreateWithoutPassagersInput>
    where?: CovoiturageWhereInput
  }

  export type CovoiturageUpdateToOneWithWhereWithoutPassagersInput = {
    where?: CovoiturageWhereInput
    data: XOR<CovoiturageUpdateWithoutPassagersInput, CovoiturageUncheckedUpdateWithoutPassagersInput>
  }

  export type CovoiturageUpdateWithoutPassagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conducteur?: UserUpdateOneRequiredWithoutCovoituragesConduitNestedInput
  }

  export type CovoiturageUncheckedUpdateWithoutPassagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    conducteurId?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCovoituragesPassagerInput = {
    update: XOR<UserUpdateWithoutCovoituragesPassagerInput, UserUncheckedUpdateWithoutCovoituragesPassagerInput>
    create: XOR<UserCreateWithoutCovoituragesPassagerInput, UserUncheckedCreateWithoutCovoituragesPassagerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCovoituragesPassagerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCovoituragesPassagerInput, UserUncheckedUpdateWithoutCovoituragesPassagerInput>
  }

  export type UserUpdateWithoutCovoituragesPassagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    articles?: ArticleUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCovoituragesPassagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuteurNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutArticlesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentCreateNestedManyWithoutUploaderInput
    signatures?: SignatureCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerCreateNestedManyWithoutUserInput
    demandesInscription?: DemandeInscriptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArticlesInput = {
    id?: string
    email: string
    nom: string
    prenom: string
    telephone?: string | null
    password?: string | null
    role?: $Enums.Role
    actif?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscriptions?: InscriptionUncheckedCreateNestedManyWithoutUserInput
    documentsUpload?: DocumentUncheckedCreateNestedManyWithoutUploaderInput
    signatures?: SignatureUncheckedCreateNestedManyWithoutUserInput
    messagesEnvoyes?: MessageUncheckedCreateNestedManyWithoutExpediteurInput
    messagesRecus?: MessageDestinataireUncheckedCreateNestedManyWithoutUserInput
    covoituragesConduit?: CovoiturageUncheckedCreateNestedManyWithoutConducteurInput
    covoituragesPassager?: CovoituragePassagerUncheckedCreateNestedManyWithoutUserInput
    demandesInscription?: DemandeInscriptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArticlesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
  }

  export type UserUpsertWithoutArticlesInput = {
    update: XOR<UserUpdateWithoutArticlesInput, UserUncheckedUpdateWithoutArticlesInput>
    create: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArticlesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArticlesInput, UserUncheckedUpdateWithoutArticlesInput>
  }

  export type UserUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUpdateManyWithoutUserNestedInput
    demandesInscription?: DemandeInscriptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actif?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscriptions?: InscriptionUncheckedUpdateManyWithoutUserNestedInput
    documentsUpload?: DocumentUncheckedUpdateManyWithoutUploaderNestedInput
    signatures?: SignatureUncheckedUpdateManyWithoutUserNestedInput
    messagesEnvoyes?: MessageUncheckedUpdateManyWithoutExpediteurNestedInput
    messagesRecus?: MessageDestinataireUncheckedUpdateManyWithoutUserNestedInput
    covoituragesConduit?: CovoiturageUncheckedUpdateManyWithoutConducteurNestedInput
    covoituragesPassager?: CovoituragePassagerUncheckedUpdateManyWithoutUserNestedInput
    demandesInscription?: DemandeInscriptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InscriptionCreateManyUserInput = {
    id?: string
    formationId: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateManyUploaderInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    formationId?: string | null
    public?: boolean
    createdAt?: Date | string
  }

  export type SignatureCreateManyUserInput = {
    id?: string
    documentId: string
    signedAt?: Date | string
    signatureUrl?: string | null
  }

  export type MessageCreateManyExpediteurInput = {
    id?: string
    sujet?: string | null
    contenu: string
    createdAt?: Date | string
  }

  export type MessageDestinataireCreateManyUserInput = {
    id?: string
    messageId: string
    lu?: boolean
    luAt?: Date | string | null
  }

  export type CovoiturageCreateManyConducteurInput = {
    id?: string
    depart: string
    destination: string
    dateDepart: Date | string
    places: number
    statut?: $Enums.StatutCovoiturage
    commentaire?: string | null
    createdAt?: Date | string
  }

  export type CovoituragePassagerCreateManyUserInput = {
    id?: string
    covoiturageId: string
    createdAt?: Date | string
  }

  export type ArticleCreateManyAuteurInput = {
    id?: string
    titre: string
    contenu: string
    publie?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemandeInscriptionCreateManyUserInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    formationId?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneRequiredWithoutInscriptionsNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    formationId?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneWithoutDocumentsNestedInput
    signatures?: SignatureUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatures?: SignatureUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    document?: DocumentUpdateOneRequiredWithoutSignaturesNestedInput
  }

  export type SignatureUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignatureUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageUpdateWithoutExpediteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destinataires?: MessageDestinataireUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateWithoutExpediteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destinataires?: MessageDestinataireUncheckedUpdateManyWithoutMessageNestedInput
  }

  export type MessageUncheckedUpdateManyWithoutExpediteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    sujet?: NullableStringFieldUpdateOperationsInput | string | null
    contenu?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageDestinataireUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    message?: MessageUpdateOneRequiredWithoutDestinatairesNestedInput
  }

  export type MessageDestinataireUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageDestinataireUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CovoiturageUpdateWithoutConducteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passagers?: CovoituragePassagerUpdateManyWithoutCovoiturageNestedInput
  }

  export type CovoiturageUncheckedUpdateWithoutConducteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passagers?: CovoituragePassagerUncheckedUpdateManyWithoutCovoiturageNestedInput
  }

  export type CovoiturageUncheckedUpdateManyWithoutConducteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    depart?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    dateDepart?: DateTimeFieldUpdateOperationsInput | Date | string
    places?: IntFieldUpdateOperationsInput | number
    statut?: EnumStatutCovoiturageFieldUpdateOperationsInput | $Enums.StatutCovoiturage
    commentaire?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoituragePassagerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    covoiturage?: CovoiturageUpdateOneRequiredWithoutPassagersNestedInput
  }

  export type CovoituragePassagerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    covoiturageId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoituragePassagerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    covoiturageId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUpdateWithoutAuteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateWithoutAuteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyWithoutAuteurInput = {
    id?: StringFieldUpdateOperationsInput | string
    titre?: StringFieldUpdateOperationsInput | string
    contenu?: StringFieldUpdateOperationsInput | string
    publie?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    formation?: FormationUpdateOneWithoutDemandesNestedInput
  }

  export type DemandeInscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    formationId?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyFormationInput = {
    id?: string
    dateDebut: Date | string
    dateFin: Date | string
    lieu?: string | null
    lienVisio?: string | null
    createdAt?: Date | string
  }

  export type InscriptionCreateManyFormationInput = {
    id?: string
    userId: string
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemandeInscriptionCreateManyFormationInput = {
    id?: string
    nom: string
    prenom: string
    email: string
    telephone?: string | null
    message?: string | null
    userId?: string | null
    statut?: $Enums.StatutInscription
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateManyFormationInput = {
    id?: string
    nom: string
    url: string
    taille?: number | null
    mimeType?: string | null
    uploaderId: string
    public?: boolean
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateDebut?: DateTimeFieldUpdateOperationsInput | Date | string
    dateFin?: DateTimeFieldUpdateOperationsInput | Date | string
    lieu?: NullableStringFieldUpdateOperationsInput | string | null
    lienVisio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInscriptionsNestedInput
  }

  export type InscriptionUncheckedUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscriptionUncheckedUpdateManyWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDemandesInscriptionNestedInput
  }

  export type DemandeInscriptionUncheckedUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemandeInscriptionUncheckedUpdateManyWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    prenom?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    statut?: EnumStatutInscriptionFieldUpdateOperationsInput | $Enums.StatutInscription
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploader?: UserUpdateOneRequiredWithoutDocumentsUploadNestedInput
    signatures?: SignatureUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploaderId?: StringFieldUpdateOperationsInput | string
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatures?: SignatureUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutFormationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    taille?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    uploaderId?: StringFieldUpdateOperationsInput | string
    public?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignatureCreateManyDocumentInput = {
    id?: string
    userId: string
    signedAt?: Date | string
    signatureUrl?: string | null
  }

  export type SignatureUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSignaturesNestedInput
  }

  export type SignatureUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SignatureUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    signedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signatureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MessageDestinataireCreateManyMessageInput = {
    id?: string
    userId: string
    lu?: boolean
    luAt?: Date | string | null
  }

  export type MessageDestinataireUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutMessagesRecusNestedInput
  }

  export type MessageDestinataireUncheckedUpdateWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MessageDestinataireUncheckedUpdateManyWithoutMessageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lu?: BoolFieldUpdateOperationsInput | boolean
    luAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CovoituragePassagerCreateManyCovoiturageInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type CovoituragePassagerUpdateWithoutCovoiturageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCovoituragesPassagerNestedInput
  }

  export type CovoituragePassagerUncheckedUpdateWithoutCovoiturageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CovoituragePassagerUncheckedUpdateManyWithoutCovoiturageInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}