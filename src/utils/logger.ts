import winston ,{format} from 'winston';
const { combine, timestamp, prettyPrint } = format;
const  levels = {
    error: 0,
    warn :1,
    info :2,
    http : 3,
    verbose : 4,
    debug : 5,
    silly: 6
  };

  const logger = winston.createLogger({
      levels: levels,
    exitOnError: false,
    format: combine(
        timestamp(),
        prettyPrint()
      ),
    transports: [
      new winston.transports.Console(),
    
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
    ]
  });

  export{ logger, levels};


  


